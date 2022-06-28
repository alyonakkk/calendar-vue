<template>
  <div v-show="isOpen" class="popup" :style="popupStyles">
    <div class="popup__arrow" :style="arrowStyles"></div>
    <CloseButton @click="handleClose" />
    <slot></slot>
  </div>
</template>

<script>
import CloseButton from "@/shared/UI/buttons/CloseButton";
export default {
  name: "DefaultPopup",
  components: { CloseButton },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    popupStyles: {
      type: Object,
      default: null,
    },
    arrowStyles: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup {
  padding: 28px 12px 12px;
  position: absolute;
  top: 45px;
  z-index: 10;
  width: 290px;
  background: #ffffff;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.25));
}
.popup__arrow {
  position: absolute;
  top: -19px;
  left: 25px;
  z-index: 1;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 15px solid #ffffff;
  transform: rotate(90deg);
}
</style>
