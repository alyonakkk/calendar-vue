<template>
  <div class="panel">
    <CActions @moveToMonth="moveToOtherMonth" />
    <CSearch @moveToMonth="moveToOtherMonth" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CSearch from "@/components/panel/CSearch";
import CActions from "@/components/panel/CActions";

export default {
  name: "CPanel",
  components: { CActions, CSearch },
  computed: {
    ...mapGetters(["getCurrentMonth", "getCurrentYear"]),
  },
  methods: {
    ...mapMutations(["setCurrentMonth", "setCurrentYear"]),
    moveToOtherMonth(date) {
      const dateSplit = date.split(".");
      this.setCurrentMonth(+dateSplit[1] - 1);
      this.setCurrentYear(+dateSplit[2]);
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
