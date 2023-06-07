import helpers from "@/helpers/helpers.js";

export default {
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
};
