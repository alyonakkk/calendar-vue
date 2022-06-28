<template>
  <textarea
    :value="value"
    class="default-textarea"
    @input="onInput"
    :placeholder="placeholder"
  ></textarea>
</template>
<script>
export default {
  name: "DefaultTextarea",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    onInput(e) {
      const val = e.target.value;
      this.$emit("input", val);
    },
  },
};
</script>
<style scoped>
.default-textarea {
  padding: 6px 12px;
  height: 125px;
  color: #292929;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
  background: #ffffff;
  border: 1px solid #cfcfcf;
  box-shadow: inset 0 0 1px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  outline: none;
  resize: none;
}
.default-textarea::placeholder {
  color: #cfcfcf;
  font-size: 14px;
  font-weight: 300;
  line-height: 16px;
}
.default-textarea:focus {
  border: 1px solid #27a1ff;
}
.default-textarea.invalid {
  color: #e94e4e;
  border: 1px solid #e94e4e;
}
.default-textarea.invalid::placeholder {
  color: #e94e4e;
}
.default-textarea:disabled {
  color: #cfcfcf;
  background: #f4f4f4;
}
</style>
