<template>
  <div class="modal-backdrop">
    <div
      class="modal"
      @click.self="$store.commit('setModalData', false)"
      tabindex="-1"
      @keydown.tab="$store.commit('setModalData', false)"
    >
      <div class="modal__inner" :style="{ height: height }">
        <div class="modal__header">
          <slot name="header"></slot>
          <div
            class="modal-close"
            @click="$store.commit('setModalData', false)"
          >
            <span></span>
          </div>
        </div>
        <div class="modal__body">
          <slot name="body"></slot>
        </div>

        <footer class="modal__footer">
          <slot name="footer"> Default Footer! </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherModal",
  data() {
    return {
      height: this.$store.getters.getError ? "auto" : "30%",
    };
  },
  mounted() {
    this.$el.focus();
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}

.modal {
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  width: 80%;
}

.modal__inner {
  border-radius: 5px;
  background: #f9f9f9;
  width: 100%;
  height: 100%;
}

.modal__header,
.modal__footer {
  padding: 15px;
  display: flex;
}

.modal__header {
  position: relative;
  border-bottom: 1px solid rgb(227, 231, 233);
  color: #000;
  justify-content: space-between;
}

.modal__body {
  position: relative;
  padding: 20px 10px;
}

.modal__footer {
  border-top: 1px solid rgb(227, 231, 233);
  flex-direction: column;
  justify-content: flex-end;
}

.modal-close {
  position: absolute;
  height: 100%;
  width: 30px;
  bottom: 0;
  right: 0;
  z-index: 101;
}

.modal-close::before,
.modal-close::after {
  position: absolute;
  content: "";
  width: 3px;
  height: 30px;
  background: #ff0d0d;
  bottom: 15px;
  left: 0;
  border-radius: 1px;
}

.modal-close::before {
  transform: rotate(135deg);
}

.modal-close::after {
  transform: rotate(-135deg);
}

@media screen and (max-width: 700px) {
  .modal__header {
    font-size: 16px;
  }
}
</style>
