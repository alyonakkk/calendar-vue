<template>
  <div class="container">
    <div class="wrapper">
      <CPanel />
      <CNavigation />
      <CCalendar />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CPanel from "@/components/panel/CPanel";
import CNavigation from "@/components/navigation/CNavigation";
import CCalendar from "@/components/calendar/CCalendar";

export default {
  components: {
    CCalendar,
    CNavigation,
    CPanel,
  },
  computed: {
    ...mapGetters(["getCurrentMonth"]),
  },
  watch: {
    getCurrentMonth() {
      this.resetStateData();
      this.resetEventDay();
    },
  },
  methods: {
    ...mapMutations(["resetStateData", "resetEventDay"]),
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container {
  display: flex;
  justify-content: center;
}
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 1001px;
}
.gray-text {
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
}

.default-text {
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
}
.error {
  font-size: 12px;
  font-weight: 500;
  color: #e94e4e;
}
</style>
