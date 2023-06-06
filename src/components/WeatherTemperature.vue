<template>
  <div>
    <div class="weather__temperature">
      <div class="city">{{ getCurrCity.name }}</div>
      <div class="temperature__img">
        <img :src="getTempCurrDay.imgUrl" alt="" />
      </div>
      <div class="temperature__text">
        <div class="text-small">{{ getTempCurrDay.description }}</div>
        {{ getTempCurrDay.temp }}
        <div class="text-small">feels like {{ getTempCurrDay.feelsLike }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "@/helpers/helpers.js";

export default {
  name: "WeatherTemperature",
  props: {
    cityItem: {
      type: Object,
    },
  },
  computed: {
    getCurrCity() {
      if (this.cityItem) {
        return this.cityItem.city;
      } else {
        return this.$store.getters.getCity;
      }
    },
    getCurrWeather() {
      if (this.cityItem && this.cityItem.currentWeather) {
        return this.cityItem.currentWeather;
      } else {
        return this.$store.getters.getCurrWeather;
      }
    },
    getTempCurrDay() {
      return {
        temp:
          helpers.methods.convertToCelsium(this.getCurrWeather.main.temp) +
          "°C",
        imgUrl: `http://openweathermap.org/img/wn/${this.getCurrWeather.weather[0].icon}@2x.png`,
        feelsLike:
          Math.round(this.getCurrWeather.main.feels_like - 273.15) + "°C",
        description: this.getCurrWeather.weather[0].description,
      };
    },
  },
};
</script>

<style scoped>
.text-small {
  font-size: 14px;
}

.weather__temperature {
  position: relative;
  margin: 10px 0 10px 0;
}

.temperature__text {
  text-align: center;
  font-size: 15px;
  color: #fff;
}

.temperature__img {
  width: 90px;
  position: absolute;
  top: -10px;
  right: 20px;
}

.temperature__img img {
  width: 100%;
}

.city {
  font-size: 20px;
  color: #fff;
  text-align: center;
  margin: 0 0 5px 0;
}

@media screen and (max-width: 480px) {
  .temperature__img {
    width: 65px;
    top: 10px;
  }
}
@media screen and (max-width: 340px) {
  .temperature__text {
    font-size: 10px;
  }
  .temperature__img {
    width: 40px;
    top: 20px;
  }
  .text-small {
    font-size: 10px;
  }
}
</style>
