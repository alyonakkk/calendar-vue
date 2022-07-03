<template>
  <div>
    <div class="calendar__cell cell">
      <p v-show="mode === 'first'" class="cell__day gray-text">
        {{ getNameOfWeekDay(day) }}
      </p>
    </div>
  </div>
</template>

<script>
import getNameOfWeekDay from "@/helpers/getNameOfWeekDay";

export default {
  name: "EmptyCell",
  props: {
    day: {
      type: Number,
      default: null,
    },
    mode: {
      type: String,
      default: "",
    },
  },
  methods: {
    getNameOfWeekDay,
  },
};
</script>
