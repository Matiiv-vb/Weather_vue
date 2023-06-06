<template>
  <div v-if="showApp" class="home__wrapper">
    <div v-if="$store.getters.getBlocks" class="blocks__wrapper">
      <div v-for="(block, index) in $store.getters.getBlocks" :key="index">
        <WeatherCard :cityDataBlockItem="block" :key="block.city.id" />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard.vue";
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Saved",
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
    this.$store.commit("takeBlocksLS");

    this.$store
      .dispatch("fetchWeather", this.$store.getters.getCityInfo)
      .then(({ data, dataForecast }) => {
        this.$store.commit("setCurrWeather", data);
        this.$store.commit("setFourDaysWeather", dataForecast.list);
        this.showApp = true;
      });
  },
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
