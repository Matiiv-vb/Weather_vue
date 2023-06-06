<template>
  <div class="item">
    <div class="item__date">{{ weekDay }}</div>
    <div class="item__img">
      <img :src="imgNoon" alt="" />/<img :src="imgNight" alt="" />
    </div>
    <div class="item__temp">{{ tempNoon }} / {{ tempNight }}</div>
  </div>
</template>

<script>
export default {
  name: "DayItem",
  data() {
    return {
      thisDay: new Date(this.day[0].dt_txt),
    };
  },
  props: {
    day: {
      type: Array,
    },
  },
  computed: {
    tempNoon() {
      return Math.round(this.day[5].main.temp - 273.15) + "°C";
    },
    tempNight() {
      return Math.round(this.day[0].main.temp - 273.15) + "°C";
    },
    weekDay() {
      return this.$store.getters.getWeek[this.thisDay.getDay()];
    },
    imgNoon() {
      return `http://openweathermap.org/img/wn/${this.day[5].weather[0].icon}@2x.png`;
    },
    imgNight() {
      return `http://openweathermap.org/img/wn/${this.day[0].weather[0].icon}@2x.png`;
    },
  },
};
</script>

<style scoped>
.item__img {
  height: 25px;
}

.item__img img {
  height: 100%;
}

.item__date {
  margin: 10px 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  padding: 5px 5px;
}

.item__temp {
  margin: 10px 0;
  font-size: 12px;
  color: #fff;
}

.item {
  padding: 0 10px;
}

.item {
  transition: all 0.3s ease-in-out;
}

@media screen and (max-width: 450px) {
  .item__img {
    height: 20px;
  }
  .item__temp {
    font-size: 10px;
  }
}
</style>
