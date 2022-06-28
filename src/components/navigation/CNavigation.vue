<template>
  <div class="navigation">
    <div class="navigation__wrapper">
      <div @click="handlePrevMonth" class="arrow prev">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1158 8.52067L6.24034 2.46262C5.83045 2.18266 5.41746 2.03448 5.07419 2.03448C4.41053 2.03448 4 2.56553 4 3.45444V16.5476C4 17.4355 4.41002 17.9655 5.07212 17.9655C5.41591 17.9655 5.82231 17.8172 6.2331 17.5365L15.1127 11.4786C15.6838 11.0883 16 10.5632 16 9.99929C16.0001 9.43575 15.6875 8.91076 15.1158 8.52067Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p class="navigation__date">{{ getMonthName }} {{ currentYear }}</p>
      <div @click="handleNextMonth" class="arrow next">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1158 8.52067L6.24034 2.46262C5.83045 2.18266 5.41746 2.03448 5.07419 2.03448C4.41053 2.03448 4 2.56553 4 3.45444V16.5476C4 17.4355 4.41002 17.9655 5.07212 17.9655C5.41591 17.9655 5.82231 17.8172 6.2331 17.5365L15.1127 11.4786C15.6838 11.0883 16 10.5632 16 9.99929C16.0001 9.43575 15.6875 8.91076 15.1158 8.52067Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <WhiteButton :title="'Сегодня'" @click="handleToday" />
  </div>
</template>

<script>
import WhiteButton from "@/shared/UI/buttons/WhiteButton";
import { months } from "@/helpers/constants";

export default {
  name: "CNavigation",
  components: { WhiteButton },
  props: {
    currentMonth: {
      type: Number,
      default: null,
    },
    currentYear: {
      type: Number,
      default: null,
    },
  },
  computed: {
    getMonthName() {
      return months[this.currentMonth];
    },
  },
  methods: {
    handlePrevMonth() {
      if (this.currentMonth - 1 >= 0) {
        this.$emit("changeMonth", this.currentMonth - 1);
      } else {
        this.$emit("changeMonth", 11);
        this.$emit("changeYear", this.currentYear - 1);
      }
    },
    handleNextMonth() {
      if (this.currentMonth + 1 < 12) {
        this.$emit("changeMonth", this.currentMonth + 1);
      } else {
        this.$emit("changeMonth", 0);
        this.$emit("changeYear", this.currentYear + 1);
      }
    },
    handleToday() {
      this.$emit("changeMonth", new Date().getMonth());
      this.$emit("changeYear", new Date().getFullYear());
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
.arrow {
  padding: 1px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  color: #6b6b6b;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
}
.arrow.next {
  transform: rotate(0deg);
}
.arrow.prev {
  transform: rotate(180deg);
}
.arrow:hover {
  color: #ffffff;
  background: #6b6b6b;
}
.arrow:active {
  color: #ffffff;
  background: #cfcfcf;
}
.arrow:disabled {
  color: #cfcfcf;
  background: #ffffff;
}
</style>
