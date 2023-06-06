import Chart from "chart.js/auto";
import helpers from "@/helpers/helpers.js";
import TemperatureChartData from "@/temperature-data.js";

// let myChart = "";
export default {
  data() {
    return {
      myChart: "",
      temperatureChart: TemperatureChartData,
    };
  },
  created: function () {
    console.log("Printing from the Mixin");
  },
  methods: {
   
  },
};
