<template>
  <COverlay :isOpen="isOpen" @onClose="closePopup">
    <div @click.stop class="popup">
      <CloseButton @click="closePopup" />
      <slot></slot>
    </div>
  </COverlay>
</template>

<script>
import COverlay from "@/shared/UI/popups/windowPopup/COverlay";
import CloseButton from "@/shared/UI/buttons/CloseButton";

export default {
  name: "WindowPopup",
  components: { CloseButton, COverlay },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup {
  padding: 20px;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  min-height: 230px;
  height: auto;
  text-align: center;
  background: white;
  border-radius: 10px;
}
</style>
