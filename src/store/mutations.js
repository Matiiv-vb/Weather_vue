export default {
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
};
