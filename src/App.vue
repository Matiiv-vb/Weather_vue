<template>
  <div class="app__wrapper">
    <Navigation />
    <router-view />

    <transition name="fade">
      <WeatherModal v-if="getModalData">
        <template v-slot:header>
          <div v-if="getModalData.delete">Delete</div>
          <div v-if="getModalData.hint">Hint</div>
        </template>
        <template v-slot:body>
          <div v-if="getModalData.delete">
            Delete city "{{ getModalData.city.name }}" from blocks ?
          </div>
          <div v-if="getModalData.hint">{{ getModalData.message }}</div>
        </template>
        <template v-slot:footer>
          <MyButton v-if="getModalData.delete" @clicked="deleteItem">
            Delete
          </MyButton>
          <MyButton v-if="getModalData.hint" @clicked="hint"> Ok </MyButton>
        </template>
      </WeatherModal>
    </transition>
  </div>
</template>

<script>
import WeatherModal from "@/components/UI/WeatherModal.vue";
import MyButton from "@/components/UI/MyButton.vue";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    WeatherModal,
    MyButton,
    Navigation,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    deleteItem(e) {
      this.$store.dispatch("deleteBlock", this.getModalData.city);
    },
    hint(e) {
      this.$store.commit("setModalData", "");
    },
  },

  computed: {
    getModalData() {
      return this.$store.getters.getModalData;
    },
  },
};
</script>

<style scoped>
.app__wrapper {
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
