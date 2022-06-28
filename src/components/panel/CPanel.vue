<template>
  <div class="panel">
    <CActions :events="events" @click="onChangeDate" />
    <CSearch :events="events" @click="onChangeDate" />
  </div>
</template>

<script>
import CSearch from "@/components/panel/CSearch";
import CActions from "@/components/panel/CActions";

export default {
  name: "CPanel",
  components: { CActions, CSearch },
  props: {
    events: {
      type: Object,
      default: null,
    },
    currentMonth: {
      type: Number,
      default: null,
    },
    currentYear: {
      type: Number,
      default: null,
    },
  },
  methods: {
    onChangeDate(date) {
      const dateSplit = date.split(".");
      this.$emit("changeMonth", +dateSplit[1] - 1);
      this.$emit("changeYear", +dateSplit[2]);
    },
  },
};
</script>

<style scoped>
.panel {
  padding: 52px 12px 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
}
</style>
