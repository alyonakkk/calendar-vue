<template>
  <button
    :disabled="isDisabled"
    @click="onClickButton"
    class="white-button"
    :type="type"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "WhiteButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    title: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickButton() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.white-button {
  padding: 2px 6px;
  width: max-content;
  color: #292929;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  background: #ffffff;
  box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.white-button:hover {
  color: #ffffff;
  background: #6b6b6b;
}
.white-button:active {
  color: #ffffff;
  background: #cfcfcf;
}
.white-button:disabled {
  color: #cfcfcf;
  background: #ffffff;
}
</style>
