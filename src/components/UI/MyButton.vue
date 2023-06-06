<template>
  <button type="button" class="btn-my" @click="click" aria-label="Close Modal">
    <slot > Default text! </slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    click(e) {
      this.$emit("clicked");
    },
  },
};
</script>

<style scoped>
.btn-my {
  border: none;
  color: #fff;
  background: #42b983;
  appearance: none;
  font: inherit;
  font-size: 18px;
  padding: 3px 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
