<template>
  <div v-if="showApp" class="home__wrapper">
    <div v-if="$store.getters.getCards" class="blocks__wrapper">
      <div v-for="(card, index) in $store.getters.getCards" :key="index">
        <WeatherCard
          :cityDataCardItem="card"
          :key="card.city.id"
          :isSearch="true"
          :idArray="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Home",
  components: {
    WeatherCard,
    MyButton,
  },
  data() {
    return {
      showApp: false,
    };
  },
  mounted() {
    this.$store.dispatch("setLocation");
    this.$store.commit("takeBlocksLS");

    this.$store
      .dispatch("fetchWeather", this.$store.getters.getCityInfo)
      .then(({ data, dataForecast }) => {
        this.$store.commit("setCurrWeather", data);
        this.$store.commit("setFourDaysWeather", dataForecast.list);

        if (this.$store.getters.getCards.length < 1) {
          this.$store.commit("addCards", {
            city: this.$store.getters.getCityInfo,
            currentWeather: data,
            fourDaysWeather: dataForecast.list,
          });
        }

        this.showApp = true;
      });
  },
  methods: {},

  computed: {},
};
</script>

<style scoped>
.home__wrapper {
  display: flex;
  flex-direction: column;
}

.head__wrapper {
  display: flex;
  justify-content: center;
  padding: 10px;
}
.blocks__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
