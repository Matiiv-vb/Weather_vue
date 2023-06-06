import { createStore } from "vuex";
import axios from "axios";
import helpers from "@/helpers/helpers.js";

export default createStore({
  state: {
    apiKey: "70e1ed322b02acbc57d443dd91065f3e",
    url: "https://api.openweathermap.org/data/2.5/",
    week: ["sun", "mon", "tue", "wed", "thurs", "fri", "sat"],
    modalData: "",
    city: {
      name: "Kharkiv",
      lat: 49.9923,
      lon: 36.231,
      id: helpers.methods.setIdAsString([36.231, 49.9923]),
    },
    cities: [],
    blocks: [],
    cards: [],
    currentWeather: "",
    fourDaysWeather: "",
    loader: false,
    error: "",
    temperatureData: "",
  },
  getters: {
    getApiKey(state) {
      return state.apiKey;
    },
    getUrl(state) {
      return state.url;
    },
    getCity(state) {
      return state.city;
    },
    getCityInfo(state) {
      return {
        lon: state.city.lon,
        lat: state.city.lat,
        name: state.city.name,
        id: helpers.methods.setIdAsString([state.city.lon, state.city.lat]),
      };
    },
    getCurrWeather(state) {
      return state.currentWeather;
    },
    getModalData(state) {
      return state.modalData;
    },
    getWeek(state) {
      return state.week;
    },
    getLoader(state) {
      return state.loader;
    },
    getFourDaysWeather(state) {
      return state.fourDaysWeather;
    },
    getCities(state) {
      return state.cities;
    },
    getAnimation(state) {
      return state.animation;
    },
    getError(state) {
      return state.error;
    },
    getCards(state) {
      return state.cards;
    },
    getBlocks(state) {
      return state.blocks;
    },
  },
  mutations: {
    setCity(state, city) {
      state.city = city;
    },
    setCurrWeather(state, data) {
      state.currentWeather = data;
    },
    setCurrWeatherBlock(state, { data, dataForecast, city }) {
      if (state.blocks) {
        state.blocks = state.blocks.map((el) => {
          if (el.city.id.includes(city.id)) {
            el.currentWeather = data;
            el.dataForecast = dataForecast;
          }
          return el;
        });
      }
    },
    setFourDaysWeather(state, data) {
      state.fourDaysWeather = data;
    },
    setModalData(state, data) {
      state.modalData = data;
    },
    setLoader(state, data) {
      state.loader = data;
    },
    setCities(state, data) {
      state.cities = data;
    },
    setAnimation(state, data) {
      state.animation = data;
    },
    setError(state, data) {
      state.error = data;
    },
    deleteBlock(state, id) {
      state.blocks = state.blocks.filter((el) => {
        return el.city.id !== id;
      });
      this.dispatch("setBlocksLS", state.blocks);
      this.commit("setModalData", "");
    },
    setBlocksLS(state, data) {
      localStorage.setItem("blocks", JSON.stringify(state.blocks));
    },
    takeBlocksLS(state, data) {
      if (localStorage.getItem("blocks")) {
        state.blocks = [...JSON.parse(localStorage.getItem("blocks"))];
      }
    },
    addBlock(state, data) {
      state.blocks.push(data);
      this.dispatch("setBlocksLS");
    },
    updateBlock(state, data) {
      state.blocks.forEach((block, ind) => {
        if (block.city.id === data.city.id) {
          state.blocks[ind] = {
            currentWeather: data.data,
            fourDaysWeather: data.dataForecast.list,
            city: data.city,
          };
        }
      });
      this.dispatch("setBlocksLS");
    },
    updateCard(state, { index, data }) {
      state.cards.forEach((block, ind) => {
        if (block.city.id === data.city.id) {
          state.cards[index] = {
            currentWeather: state.currentWeather,
            fourDaysWeather: state.fourDaysWeather,
            city: state.city,
          };
        }
      });
    },
    addCards(state, data) {
      state.cards.push(data);
    },
    deleteCard(state, { city, idArray }) {
      if (state.cards.length > 1) {
        state.cards = state.cards.filter((el, ind) => {
          return !(el.city.id == city.id && idArray == ind);
        });
      }
      this.commit("setModalData", "");
    },
  },
  actions: {
    async fetchCities({ getters, commit }, city) {
      if (city.length > 1)
        try {
          let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&lang=ua&appid=${getters.getApiKey}`;
          const response = await axios.get(url);
          const data = response.data;
          commit("setCities", []);
          let citiesArr = [];
          for (let item of data) {
            citiesArr.push(item);
          }
          commit("setCities", citiesArr);
        } catch (e) {
          commit("setError", e.toString());
        }
      else commit("setCities", []);
    },
    async fetchWeather({ getters, commit }, city) {
      try {
        commit("setLoader", true);
        let url = `${getters.getUrl}weather?lat=${city.lat}&lon=${city.lon}&appid=${getters.getApiKey}`;
        let response = await axios.get(url);
        const data = response.data;
        url = `${getters.getUrl}forecast?lat=${city.lat}&lon=${city.lon}&appid=${getters.getApiKey}`;
        response = await axios.get(url);
        const dataForecast = response.data;
        commit("setLoader", false);
        return { data, dataForecast, city };
      } catch (e) {
        commit("setError", e.toString());
      }
    },

    setBlocksLS({ getters, commit }) {
      commit("setBlocksLS");
    },

    deleteBlock({ commit }, city) {
      commit("deleteBlock", city.id);
    },

    addBlock({ getters, commit, state }, data) {
      let hasBlock = "";
      if (state.blocks && state.blocks.length >= 5) {
        this.commit("setModalData", {
          hint: true,
          message: "In order to add - delete the city, 5 is a max",
          city: data.city,
        });
      }
      if (state.blocks && state.blocks.length) {
        hasBlock = state.blocks.find((el) => {
          if (el.city.id) {
            return el.city.id.includes(data.city.id);
          }
        });
      }
      if (hasBlock) {
        this.commit("setModalData", {
          hint: true,
          message: `City "${data.city.name}" is already exist in list`,
          city: data.city,
        });
      }
      if (state.blocks && state.blocks.length <= 4 && !hasBlock) {
        commit("addBlock", {
          city: data.city,
          currentWeather: data.currentWeather,
          fourDaysWeather: data.fourDaysWeather,
        });
      }
    },

    addCard({ getters, commit, state }, data) {
      if (state.cards && state.cards.length >= 5) {
        this.commit("setModalData", {
          hint: true,
          message: "In order to add - delete the city, 5 is a max",
          city: state.city,
        });
      }
      if (state.cards && state.cards.length <= 4) {
        commit("addCards", {
          city: state.city,
          currentWeather: state.currentWeather,
          fourDaysWeather: state.fourDaysWeather,
        });
      }
    },

    updateBlock({ getters, commit, state }, data) {
      if (state.blocks && state.blocks.length) {
        commit("updateBlock", data);
      }
    },

    async setLocation({ commit, state, dispatch, getters }, data) {
      try {
        let response = await axios.get(`https://api.techniknews.net/ipgeo/`);
        commit("setCity", {
          name: response.data.city,
          lat: response.data.lat,
          lon: response.data.lon,
          id: helpers.methods.setIdAsString([
            response.data.lon,
            response.data.lat,
          ]),
        });
        return getters.getCity;
      } catch (e) {
        commit("setError", e.toString());
      }
    },

  },
});
