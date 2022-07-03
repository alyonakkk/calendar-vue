<template>
  <div
    class="calendar__cell cell"
    :class="{
      'has-event': getFromLocalStorage(day),
      active: getClickedCell === day,
      today: isToday(day),
    }"
    @click="$emit('click', $event, day)"
  >
    <p class="cell__day gray-text">
      <span v-show="isFirstRow(day)">
        {{ getNameOfWeekDay(getDayOfWeek(day)) }},
      </span>
      {{ day }}
    </p>
    <p class="cell__event-name default-text">
      {{ getFromLocalStorage(day, "event") }}
    </p>
    <p class="call__event-members gray-text">
      {{ getFromLocalStorage(day, "members") }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getNameOfWeekDay from "@/helpers/getNameOfWeekDay";

export default {
  name: "FillCell",
  props: {
    day: {
      type: Number,
      default: null,
    },
    firstDayOfWeek: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...mapGetters([
      "getCurrentMonth",
      "getCurrentYear",
      "getClickedCell",
      "getFromLocalStorage",
      "getDayOfWeek",
    ]),
  },
  methods: {
    getNameOfWeekDay,
    isFirstRow(day) {
      return day + (this.firstDayOfWeek - 1) <= 7;
    },
    isToday(day) {
      const date = new Date();
      const currentDay = date.getDate();
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();
      return (
        day === currentDay &&
        this.getCurrentMonth === currentMonth &&
        this.getCurrentYear === currentYear
      );
    },
  },
};
</script>
