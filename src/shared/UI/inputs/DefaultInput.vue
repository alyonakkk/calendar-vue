<template>
  <input
    :value="value"
    @input="onInput"
    :disabled="isDisabled"
    class="default-input"
    :class="{
      invalid: false,
    }"
    type="text"
    :placeholder="placeholder"
  />
</template>
<script>
export default {
  name: "DefaultInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    clickedCell: {
      type: Number,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isError: false,
    };
  },
  watch: {
    clickedCell() {
      this.isError = false;
    },
  },
  methods: {
    onInput(e) {
      const val = e.target.value;
      this.$emit("input", val);
      this.isError = !val;
    },
  },
};
</script>
<style scoped>
.default-input {
  padding: 6px 12px;
  color: #292929;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  background: #ffffff;
  border: 1px solid #cfcfcf;
  box-shadow: inset 0 0 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  outline: none;
}
.default-input::placeholder {
  color: #cfcfcf;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
}
.default-input:focus {
  border: 1px solid #27a1ff;
}
.default-input.invalid {
  color: #e94e4e;
  border: 1px solid #e94e4e;
}
.default-input.invalid::placeholder {
  color: #e94e4e;
}
.default-input:disabled {
  color: #cfcfcf;
  background: #f4f4f4;
}
</style>
