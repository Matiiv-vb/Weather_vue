<template>
  <div class="temperature-chart__wrapper">
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import TemperatureChartData from "@/temperature-data.js";
import helpers from "@/helpers/helpers.js";
import chartMixin from "@/mixin/chart-mixin.js";
import { isProxy, toRaw } from "vue";

export default {
  name: "TemperatureChart",
  // mixins: [chartMixin],
  props: {
    cityItem: {
      type: Object,
    },
    chartId: {
      type: String,
    },
  },
  data() {
    return {
      temperatureChart: TemperatureChartData,
      myChart: "",
    };
  },
  // created() {
  //   window.addEventListener("resize", this.myEventHandler);
  // },
  // destroyed() {
  //   window.removeEventListener("resize", this.myEventHandler);
  // },
  mounted() {
    this.setChart(TemperatureChartData, this.chartId);

    if (!this.cityItem) {
      this.setNewDataToChart(
        this.$store.getters.getFourDaysWeather,
        this.myChart
      );
    } else if (this.cityItem && this.cityItem.fourDaysWeather) {
      this.setNewDataToChart(this.cityItem.fourDaysWeather, this.myChart);
    }
  },
  methods: {
    myEventHandler(e) {
      // this.setNewDataToChart(this.data, this.myChart);
    },
    setChart(data, id) {
      const ctx = document.getElementById(id);
      Chart.defaults.color = "#000";
      this.myChart = new Chart(ctx, data);
    },

    setNewDataToChart(daysWeather, chartEditor) {
      const chart = toRaw(chartEditor);
      if (daysWeather && daysWeather.length) {
        chart.data.datasets[0].data = [];
        chart.data.datasets[0].data = [];
        chart.data.labels = [];

        daysWeather.forEach((element, index) => {
          if (index < 8) {
            const hour = element.dt_txt.split(" ")[1].slice(0, -3);
            const temp = helpers.methods.convertToCelsium(element.main.temp);
            chart.data.datasets[0].data.push(temp);
            chart.data.labels.push(hour);
          }
        });
        chart.update();
      }
    },
  },
  watch: {
    getFourDaysWeatherComputed: {
      deep: true,
      handler(newVal) {
        if (!this.cityItem ) {
          this.setNewDataToChart(newVal, this.myChart);
        }
      },
    },
  },
  computed: {
    getFourDaysWeatherComputed() {
      return this.$store.getters.getFourDaysWeather;
    },
  },
};
</script>

<style scoped>
.temperature-chart__wrapper {
  border-radius: 5px;
}
</style>
