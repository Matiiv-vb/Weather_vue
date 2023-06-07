import axios from "axios";
import helpers from "@/helpers/helpers.js";

export default {
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
};
