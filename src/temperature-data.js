export const temperatureChartData = {
  type: "line",
  data: {
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"],
    datasets: [
      {
        label: "Temperature",
        data: [18, 26, 14, 22, 12, 20, 12, 18, 10],
        fill: false,
        scaleFontColor: "#000",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "transparent",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 3,
        pointHoverBorderColor: "rgba(255, 255, 255, 1)",
        pointHoverBorderWidth: 10,
        lineTension: 0,
      },
    ],
  },
  responsive: true,
  options: {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
        },

        ticks: {
          major: {
            enabled: true,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Temp",
        },
      },
    },
  },
};

export default temperatureChartData;
