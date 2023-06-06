<template>
  <div class="weather__card">
    <div class="head__card">
      <Switch :day="isTemparature" @setVal="toggleCheckbox" />
      <div
        class="add-button"
        v-if="isSearch"
        @click="$store.dispatch('addCard')"
      ></div>
      <div
        class="save-button"
        v-if="isSearch"
        @click="$store.dispatch('addBlock', this.cityDataCardItem)"
      >
        save
      </div>
      <div
        class="delete-button margin-left-button"
        v-if="isSearch"
        @click="
          $store.commit('setModalData', {
            city: cityDataCardItem.city,
            delete: true,
            card: true,
            idArray: idArray,
          })
        "
      ></div>
      <div
        class="delete-button"
        v-if="!isSearch"
        @click="
          $store.commit('setModalData', {
            city: cityDataBlockItem.city,
            delete: true,
            block: true,
          })
        "
      ></div>
    </div>
    <weather-search
      v-if="isSearch"
      :cityItem="cityDataCardItem"
      :idArray="idArray"
    ></weather-search>
    <weather-temperature :cityItem="currentCityItem"></weather-temperature>
    <div v-if="!isTemparature">
      <temperature-chart
        :cityItem="currentCityItem"
        :chartId="chartId"
      ></temperature-chart>
    </div>
    <div v-else>
      <weather-five-days
        :data="getFourDaysWeather"
        :key="chartId"
      ></weather-five-days>
    </div>
  </div>
</template>

<script>
import weatherSearch from "@/components/WeatherSearch.vue";
import weatherTemperature from "@/components/WeatherTemperature.vue";
import weatherFiveDays from "@/components/WeatherFiveDays.vue";
import TemperatureChart from "@/components/TemperatureChart.vue";
import Switch from "@/components/Switch.vue";
import TemperatureChartData from "@/temperature-data.js";

export default {
  name: "WeatherCard",
  components: {
    weatherSearch,
    weatherTemperature,
    weatherFiveDays,
    TemperatureChart,
    Switch,
  },
  props: {
    cityDataBlockItem: {
      type: Object,
    },
    cityDataCardItem: {
      type: Object,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
    idArray: {
      type: Number,
    },
  },
  mounted() {
    if (this.cityDataBlockItem && this.cityDataBlockItem.city) {
      this.$store
        .dispatch("fetchWeather", this.cityDataBlockItem.city)
        .then(({ data, dataForecast }) => {
          this.$store.dispatch("updateBlock", {
            data,
            dataForecast,
            city: this.cityDataBlockItem.city,
          });
        });
    }
  },
  data() {
    return {
      isTemparature: false,
      temperatureChart: TemperatureChartData,
    };
  },
  methods: {
    toggleCheckbox(e) {
      this.isTemparature = e;
    },
  },
  computed: {
    idBlock() {
      return this.cityDataBlockItem ? this.cityDataBlockItem.city.id : "";
    },
    idCard() {
      return this.cityDataCardItem ? this.cityDataCardItem.city.id : "";
    },
    chartId() {
      return this.idBlock
        ? `temperature-chart${this.idBlock}`
        : `temperature-chart${this.idCard}${this.idArray}`;
    },
    currentCityItem() {
      return this.cityDataBlockItem
        ? this.cityDataBlockItem
        : this.cityDataCardItem;
    },
    getFourDaysWeather() {
      if (this.cityDataBlockItem && this.cityDataBlockItem.fourDaysWeather) {
        return this.cityDataBlockItem.fourDaysWeather;
      }
      if (this.cityDataCardItem && this.cityDataCardItem.fourDaysWeather) {
        return this.cityDataCardItem.fourDaysWeather;
      } else {
        return this.$store.getters.getFourDaysWeather;
      }
    },
  },
};
</script>

<style scoped>
.weather__card {
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  min-height: 300px;
  width: 370px;
  max-height: 400px;
  background: rgba(40, 47, 247, 0.5);
}
.head__card {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.save-button {
  position: absolute;
  right: 70px;
  color: #fff;
  transition: all 0.3s;
}

.add-button,
.delete-button {
  position: absolute;
  height: 100%;
  width: 30px;
  bottom: 0;
  right: 0;
  transition: all 0.3s;
}

.margin-left-button {
  right: 35px;
}

.save-button:hover,
.add-button:hover,
.delete-button:hover {
  transform: scale(1.1);
}

.add-button::before,
.add-button::after,
.delete-button::before,
.delete-button::after {
  position: absolute;
  content: "";
  width: 3px;
  height: 25px;
  background: #fff;
  bottom: 0px;
  left: 15px;
  border-radius: 1px;
}

.delete-button::before,
.delete-button::after {
  background: rgb(123, 5, 5);
}

.add-button::before {
  transform: rotate(90deg);
}

.add-button::after {
  transform: rotate(-180deg);
}
.delete-button::before {
  transform: rotate(135deg);
}

.delete-button::after {
  transform: rotate(-135deg);
}

@media screen and (max-width: 450px) {
  .weather__card {
    width: 300px;
  }
}
@media screen and (max-width: 380px) {
  .weather__card {
    width: 240px;
  }
}
</style>
