<template>
  <div class="weather__days">
    <div v-for="(day, index) in getWeather" :key="index">
      <day-item :day="day"></day-item>
    </div>
  </div>
</template>

<script>
import dayItem from "@/components/DayItem.vue";

export default {
  name: "WeatherFiveDays",
  components: {
    dayItem,
  },
  props: {
    data: {
      type: Object,
    },
  },

  methods: {},
  computed: {
    getFourDaysWeather() {
      if (this.data) {
        return this.data;
      } else {
        return this.$store.getters.getFourDaysWeather;
      }
    },
    getWeather() {
      let days = "";
      const data = this.getFourDaysWeather;
      let thisDay = new Date(data[0].dt_txt);
      let mas = [];
      let prev = 0;
      for (let item of data) {
        let date = new Date(item.dt_txt);
        if (date.getDay() != thisDay.getDay()) {
          if (new Date(prev.dt_txt).getDay() === date.getDay()) {
            mas.push(item);
          } else {
            if (mas.length > 0) days += JSON.stringify(mas) + ",";
            mas.length = 0;
            mas.push(item);
          }
        }
        prev = item;
      }
      return JSON.parse("[" + days.substring(0, days.length - 1) + "]");
    },
  },
};
</script>

<style scoped>
.weather__days {
  display: flex;
  margin-top: 5px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  justify-content: center;
}

@media screen and (max-width: 450px) {
  .weather__days {
    flex-wrap: wrap;
  }
}

</style>
