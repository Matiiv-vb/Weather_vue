export default {
  methods: {
    convertToCelsium(temp) {
      return Math.round(temp - 273.15);
    },
    setIdAsString(arr) {
      return arr
        .map((el) => {
          return el.toString();
        })
        .join("|");
    },
  },
};
