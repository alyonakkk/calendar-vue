<template>
  <div class="navigation">
    <div class="navigation__wrapper">
      <ArrowButton
        @click="handlePrevMonth"
        :styles="{ transform: 'rotate(180deg)' }"
      />
      <p class="navigation__date">{{ getMonthName }} {{ getCurrentYear }}</p>
      <ArrowButton @click="handleNextMonth" class-style="next" />
    </div>
    <WhiteButton :title="'Сегодня'" @click="handleToday" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import WhiteButton from "@/shared/UI/buttons/WhiteButton";
import { months } from "@/helpers/constants";
import ArrowButton from "@/shared/UI/buttons/ArrowButton";

export default {
  name: "CNavigation",
  components: { ArrowButton, WhiteButton },
  computed: {
    ...mapGetters(["getCurrentMonth", "getCurrentYear"]),
    getMonthName() {
      return months[this.getCurrentMonth];
    },
  },
  methods: {
    ...mapMutations(["setCurrentMonth", "setCurrentYear"]),
    handlePrevMonth() {
      if (this.getCurrentMonth - 1 >= 0) {
        this.setCurrentMonth(this.getCurrentMonth - 1);
      } else {
        this.setCurrentMonth(11);
        this.setCurrentYear(this.getCurrentYear - 1);
      }
    },
    handleNextMonth() {
      if (this.getCurrentMonth + 1 < 12) {
        this.setCurrentMonth(this.getCurrentMonth + 1);
      } else {
        this.setCurrentMonth(0);
        this.setCurrentYear(this.getCurrentYear + 1);
      }
    },
    handleToday() {
      this.setCurrentMonth(new Date().getMonth());
      this.setCurrentYear(new Date().getFullYear());
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navigation__date {
  width: 120px;
  color: #292929;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  text-align: center;
}
.navigation__wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>
