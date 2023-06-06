<template>
  <div class="weather__search">
    <input
      name="city"
      id="search__input"
      class="search__input"
      type="search"
      v-model.trim="city"
      @keyup.enter="showWeather"
      placeholder="Введіть місто..."
    />
    <transition name="list-slide">
      <ul id="ul" class="cities-list" v-if="cities.length">
        <li v-for="item in cities" :key="item.id" @click="showWeather">
          {{ cityFullInfo(item) }}
        </li>
      </ul>
    </transition>
    <div class="search__img">
      <img :src="search" alt="" @click="showWeather" />
    </div>
  </div>
</template>

<script>
import search from "@/assets/search.png";
import helpers from "@/helpers/helpers.js";
export default {
  name: "WeatherSearch",
  data() {
    return {
      search: search,
      city: "",
      cities: [],
    };
  },
  props: {
    cityItem: {
      type: Object,
    },
    idArray: {
      type: Number,
    },
  },
  methods: {
    cityFullInfo(item) {
      return (
        item.name +
        " | " +
        item.country +
        ("state" in item ? " " + item.state : "")
      );
    },
    showWeather(event) {
      this.$store.commit("setLoader", true);
      this.city =
        event.target.textContent != "" ? event.target.textContent : this.city;
      let searchCity = null;
      if (event.target.textContent != "") {
        let mas1 = this.city.split("|");
        let name = mas1[0].trim();
        let mas2 = mas1[1].trimStart().trimEnd().split(" ");
        let country = mas2[0].trimEnd().trimStart();
        let state = "";
        for (let i = 1; i < mas2.length; i++) {
          state += typeof mas2[i] === "undefined" ? "" : mas2[i].trim() + " ";
        }
        state = state.trim();
        for (let item of this.cities) {
          if (state != "") {
            if (
              name === item.name &&
              country === item.country &&
              state == item.state
            ) {
              searchCity = item;
              break;
            }
          } else if (name === item.name && country === item.country) {
            searchCity = item;
            break;
          }
        }

        searchCity.id = helpers.methods.setIdAsString([
          searchCity.lon,
          searchCity.lat,
        ]);

        this.$store.commit("setCity", searchCity);
        this.$store
          .dispatch("fetchWeather", this.$store.getters.getCityInfo)
          .then(({ data, dataForecast }) => {
            this.$store.commit("setCurrWeather", data);
            this.$store.commit("setFourDaysWeather", dataForecast.list);
            this.$store.commit("updateCard", {
              index: this.idArray,
              data: this.cityItem,
            });
          });
        this.cities.length = 0;
      } else {
        this.$store
          .dispatch("fetchCities", this.city)
          .then(() => {
            searchCity = this.$store.getters.getCities[0];
            searchCity.id = helpers.methods.setIdAsString([
              searchCity.lon,
              searchCity.lat,
            ]);
            this.$store.commit("setCity", searchCity);
            this.$store
              .dispatch("fetchWeather", this.$store.getters.getCityInfo)
              .then(({ data, dataForecast }) => {
                this.$store.commit("setCurrWeather", data);
                this.$store.commit("setFourDaysWeather", dataForecast.list);
                this.$store.commit("updateCard", {
                  index: this.idArray,
                  data: this.cityItem,
                });
              });
            this.cities.length = 0;
          })
          .catch(() => {
            this.$store.commit(
              "setError",
              "Sorry, I can't find your city. Please, try again or refresh the page"
            );
            this.$store.commit("setLoader", false);
          });
      }
    },
  },
  watch: {
    city() {
      this.$store.dispatch("fetchCities", this.city).then(() => {
        this.cities = this.$store.getters.getCities;
      });
    },
  },
};
</script>

<style scoped>
.cities-list {
  color: #000;
  list-style: none;
  background: rgba(124, 127, 130, 0.9);
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 3;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: all 0.3s ease-in-out;
  margin: 0;
  padding: 0;
}

.cities-list li {
  font-size: 14px;
  margin: 5px 0;
  padding: 5px 5px;
  cursor: pointer;
}

.cities-list li:first-child {
  padding-top: 60px;
}

.list-slide-enter-active,
.list-slide-leave-active {
  transition: all 0.3s ease;
}

.list-slide-enter-from,
.list-slide-leave-to {
  opacity: 0;
  transform: translateY(-25%) rotateX(-90deg);
}

.weather__search {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-top: 14px;
}

.search__input {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background: rgba(158, 155, 155, 0.5);
  color: #000;
  position: relative;
  z-index: 4;
  width: 100%;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.search__input:focus {
  outline: 2px solid #fff;
  background: rgba(121, 113, 113, 0.5);
}

.search__img {
  position: absolute;
  right: 5px;
  top: 20%;
  width: 15px;
  height: 15px;
  z-index: 4;
}

.search__img img {
  width: 100%;
  transition: transform 0.2s ease-in;
}
.search__img img:hover {
  transform: scale(1.2);
}
@media screen and (max-width: 620px) {
  .weather__search {
    width: 100%;
  }

  .search__input {
    width: 100%;
  }
}

@media screen and (min-width: 620px) and (max-height: 595px) {
  .weather__search {
    display: block;
  }

  .search__input {
    width: 100%;
  }
}
</style>
