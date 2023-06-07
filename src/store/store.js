import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
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
  getters,
  mutations,
  actions,
});
