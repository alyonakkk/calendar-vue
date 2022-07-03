<template>
  <div ref="calendar" class="calendar">
    <EmptyCell
      v-for="day in firstEmptyCells"
      :day="day"
      mode="first"
      :key="`first-${day}`"
    />
    <FillCell
      v-for="day in daysInMonth"
      ref="cell"
      :day="day"
      :first-day-of-week="firstDayOfWeek"
      @click="handleCell"
      :key="day"
    />
    <EmptyCell
      v-for="day in lastEmptyCells"
      :day="day"
      mode="last"
      :key="`last-${day}`"
    />
    <DefaultPopup
      :is-open="getIsActivePopup"
      :popup-styles="popupCoordinates"
      :arrow-styles="popupArrowCoordinates"
      @close="resetStateData"
    >
      <AddEventForm />
    </DefaultPopup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import getObjectAssign from "@/helpers/getObjectAssign";
import getNameOfWeekDay from "@/helpers/getNameOfWeekDay";
import DefaultPopup from "@/shared/UI/popups/defaultPopup/DefaultPopup";
import AddEventForm from "@/components/forms/AddEventForm";
import EmptyCell from "@/components/calendar/EmptyCell";
import FillCell from "@/components/calendar/FillCell";

export default {
  name: "CCalendar",
  components: { FillCell, EmptyCell, AddEventForm, DefaultPopup },
  data() {
    return {
      popupOffset: {
        width: 315,
        height: 390,
      },
      popupCoordinates: {
        top: 0,
        left: 0,
      },
      popupArrowCoordinates: {
        top: 0,
        left: 0,
        transform: "rotate(0deg)",
      },
      calendarOffset: {
        width: 0,
        height: 0,
      },
      cellOffset: {
        width: 0,
        height: 0,
      },
    };
  },
  mounted() {
    const refCalendar = this.$refs.calendar;
    const refCell = this.$refs.cell[0].$el;
    this.$set(this.calendarOffset, "width", refCalendar.offsetWidth);
    this.$set(this.calendarOffset, "height", refCalendar.offsetHeight);
    this.$set(this.cellOffset, "width", refCell.offsetWidth);
    this.$set(this.cellOffset, "height", refCell.offsetHeight);
  },
  computed: {
    ...mapGetters([
      "getEvents",
      "getCurrentMonth",
      "getCurrentYear",
      "getDayEvent",
      "getClickedCell",
      "getIsActivePopup",
      "getDateString",
      "getDayOfWeek",
    ]),
    firstDayOfWeek() {
      return this.getDayOfWeek(1);
    },
    firstEmptyCells() {
      let day = this.firstDayOfWeek;
      if (day === 0) day = 7;
      return day - 1;
    },
    lastEmptyCells() {
      return this.weeksInMonth * 7 - this.daysInMonth - this.firstEmptyCells;
    },
    daysInMonth() {
      return new Date(
        this.getCurrentYear,
        this.getCurrentMonth + 1,
        0
      ).getDate();
    },
    weeksInMonth() {
      return Math.ceil((this.daysInMonth + this.firstDayOfWeek - 1) / 7);
    },
  },
  watch: {
    getClickedCell(value) {
      if (value) {
        const newEventDateValue = this.getDateString(value);
        const dayEvent = this.getEvents[newEventDateValue];
        if (dayEvent) {
          this.setEventDay({
            event: dayEvent.event,
            date: newEventDateValue,
            members: dayEvent.members,
            description: dayEvent.description,
          });
        } else {
          this.setEventDay({
            ...this.getDayEvent,
            date: newEventDateValue,
          });
          this.resetEventDay();
        }
        this.setIsActivePopup(true);
      }
    },
  },
  methods: {
    ...mapMutations([
      "setEventDay",
      "setEventDayDate",
      "setClickedCell",
      "setIsActivePopup",
      "resetEventDay",
      "resetStateData",
    ]),
    getNameOfWeekDay,
    handleCell(e, day) {
      const target = e.target;
      this.calculatePopupCoordinates(target.offsetTop, target.offsetLeft);
      this.setClickedCell(day);
    },
    calculatePopupCoordinates(top = 0, left = 0) {
      let popupTop = top;
      let popupLeft = left + this.cellOffset.width + 15;
      let popupArrowTop = 15;
      let popupArrowLeft = -15;
      let popupArrowRotate = 0;
      if (popupLeft + this.popupOffset.width > this.calendarOffset.width) {
        popupLeft -= this.cellOffset.width + this.popupOffset.width + 15;
        popupArrowLeft += this.popupOffset.width - 10;
        popupArrowRotate = 180;
      }
      if (
        popupTop + this.popupOffset.height - this.cellOffset.height >
        this.calendarOffset.height
      ) {
        popupTop -=
          Math.ceil(this.cellOffset.height / 2) +
          Math.ceil(this.popupOffset.height / 2);
        popupArrowTop -= this.cellOffset.height - this.popupOffset.height;
      }
      this.popupCoordinates = getObjectAssign({
        top: `${popupTop}px`,
        left: `${popupLeft}px`,
      });
      this.popupArrowCoordinates = getObjectAssign({
        top: `${popupArrowTop}px`,
        left: `${popupArrowLeft}px`,
        transform: `rotate(${popupArrowRotate}deg)`,
      });
    },
  },
};
</script>

<style>
.calendar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}

.calendar__cell {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 143px;
  height: 120px;
  overflow: auto;
  border: 1px solid #292929;
  cursor: pointer;
}

.calendar__cell:hover {
  background: #f4f4f4;
}

.calendar__cell::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.calendar__cell::-webkit-scrollbar-thumb {
  background-color: rgba(107, 107, 107, 0.6);
  border-radius: 10px;
}

.calendar__cell.active:hover {
  background: #ffffff;
}

.calendar__cell.has-event {
  background: #c2e4fe;
  border: 1px solid #292929;
}

.calendar__cell.has-event:hover {
  background: #27a1ff;
}

.calendar__cell.has-event.active:hover {
  background: #c2e4fe;
}

.calendar__cell.active {
  box-shadow: 0px 0px 10px 2px #0271c7;
}

.calendar__cell.today,
.calendar__cell.active.today {
  background: #27a1ff;
}
</style>
