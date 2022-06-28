<template>
  <button @click="onClickButton" class="default-button">{{ title }}</button>
</template>

<script>
export default {
  name: "DefaultButton",
  props: {
    title: {
      type: String,
      default: "",
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
.default-button {
  padding: 6px 12px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  background: #0271c7;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.default-button:hover {
  background: #27a1ff;
}
.default-button:active {
  background: #c2e4fe;
}
.default-button:disabled {
  background: #cfcfcf;
}
</style>
