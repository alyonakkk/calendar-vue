<template>
  <img
    @click="onClickClose"
    class="close-icon"
    :style="styles"
    src="../../../assets/cross.svg"
    alt="cross_icon"
  />
</template>

<script>
export default {
  name: "CloseButton",
  props: {
    styles: {
      type: Object,
      default: null,
    },
  },
  methods: {
    onClickClose() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.close-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 6px;
  height: 6px;
  cursor: pointer;
}
</style>
