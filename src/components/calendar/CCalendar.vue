<template>
  <div ref="calendar" class="calendar">
    <div
      v-for="day in firstDayOfMonth"
      class="calendar__cell cell"
      :key="`first-${day}`"
    >
      <p class="cell__day gray-text">{{ getDayOfWeekName(day) }}</p>
    </div>
    <div
      v-for="day in daysInMonth"
      ref="cell"
      class="calendar__cell cell"
      :class="{
        'has-event': getFromLocalStorage(day),
        active: clickedCell === day,
      }"
      @click="handleCell($event, day)"
      :key="day"
    >
      <p class="cell__day gray-text">
        <span v-show="isFirstRow(day)"
          >{{ getDayOfWeekName(getDayOfWeek(day)) }},</span
        >
        {{ day }}
      </p>
      <p class="cell__event-name default-text">
        {{ getFromLocalStorage(day) }}
      </p>
      <p class="call__event-members gray-text">
        {{ getFromLocalStorage(day, "members") }}
      </p>
    </div>
    <div
      v-for="day in lastDaysOfMonth"
      class="calendar__cell cell"
      :key="`last-${day}`"
    ></div>
    <DefaultPopup
      :is-open="isPopupActive"
      :popup-styles="popupCoordinates"
      :arrow-styles="popupArrowCoordinates"
      @close="resetCalendarStates"
    >
      <form class="add-event__form">
        <div class="add-event__fields-wrapper">
          <div class="add-event__wrapper">
            <DefaultInput
              :value="eventName"
              :placeholder="'Событие'"
              :clicked-cell="clickedCell"
              @input="onChangeEventName"
            />
            <DefaultInput
              :value="eventDate"
              :is-disabled="true"
              :clicked-cell="clickedCell"
            />
            <DefaultInput
              :value="eventMembers"
              :placeholder="'Имена участников'"
              :clicked-cell="clickedCell"
              @input="onChangeEventMembers"
            />
          </div>
          <DefaultTextarea
            :value="eventDesc"
            @input="onChangeEventDescription"
            :placeholder="'Описание'"
          />
        </div>
        <div class="add-event__buttons-wrapper">
          <WhiteButton :title="'Готово'" @click="submitAddEvent" />
          <WhiteButton :title="'Удалить'" @click="submitRemoveEvent" />
        </div>
      </form>
    </DefaultPopup>
  </div>
</template>

<script>
import { daysOfWeek } from "@/helpers/constants";
import DefaultInput from "@/shared/UI/inputs/DefaultInput";
import WhiteButton from "@/shared/UI/buttons/WhiteButton";
import DefaultTextarea from "@/shared/UI/textareas/DefaultTextarea";
import DefaultPopup from "@/shared/UI/popups/defaultPopup/DefaultPopup";

export default {
  name: "CCalendar",
  components: { DefaultPopup, DefaultTextarea, WhiteButton, DefaultInput },
  props: {
    events: {
      type: Object,
      default: null,
    },
    isPopupActive: {
      type: Boolean,
      default: false,
    },
    clickedCell: {
      type: Number,
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
    eventName: {
      type: String,
      default: "",
    },
    eventDate: {
      type: String,
      default: "",
    },
    eventMembers: {
      type: String,
      default: "",
    },
    eventDesc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      popupOffsetWidth: 315,
      popupOffsetHeight: 390,
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
    const refCell = this.$refs.cell;
    this.$set(this.calendarOffset, "width", refCalendar.offsetWidth);
    this.$set(this.calendarOffset, "height", refCalendar.offsetHeight);
    this.$set(this.cellOffset, "width", refCell[0].offsetWidth);
    this.$set(this.cellOffset, "height", refCell[0].offsetHeight);
  },
  computed: {
    firstDayOfMonth() {
      let day = this.getDayOfWeek(1);
      if (day === 0) day = 7;
      return day - 1;
    },
    lastDaysOfMonth() {
      return this.weeksInMonth * 7 - this.daysInMonth - this.firstDayOfMonth;
    },
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    weeksInMonth() {
      return Math.ceil((this.daysInMonth + this.getDayOfWeek(1) - 1) / 7);
    },
  },
  watch: {
    clickedCell(value) {
      if (value) {
        const newEventDateValue = this.getDateString(value);
        const dayEvent = this.events[newEventDateValue];
        if (dayEvent) {
          this.onChangeEventName(dayEvent.event);
          this.onChangeEventMembers(dayEvent.members);
          this.onChangeEventDescription(dayEvent.description);
        } else {
          this.resetAddFormFields();
        }
        this.onChangeEventDate(newEventDateValue);
        this.onChangeIsActivePopup(true);
      }
    },
  },
  methods: {
    onChangeClickedCell(value) {
      this.$emit("changeClickedCell", value);
    },
    onChangeIsActivePopup(value) {
      this.$emit("changeIsActivePopup", value);
    },
    onChangeEventName(value) {
      this.$emit("changeEventName", value);
    },
    onChangeEventMembers(value) {
      this.$emit("changeEventMembers", value);
    },
    onChangeEventDate(value) {
      this.$emit("changeEventDate", value);
    },
    onChangeEventDescription(value) {
      this.$emit("changeEventDescription", value);
    },
    handleCell(e, day) {
      this.calculatePopupCoordinates(e.target.offsetTop, e.target.offsetLeft);
      this.onChangeClickedCell(day);
    },
    submitAddEvent() {
      if (
        this.isValid(this.eventName) &&
        this.isValid(this.eventDate) &&
        this.isValid(this.eventMembers)
      ) {
        const formData = {
          event: this.eventName,
          date: this.eventDate,
          members: this.eventMembers,
          description: this.eventDesc,
        };
        this.saveInLocalStorage(formData);
        this.resetAddFormFields();
        this.resetCalendarStates();
      }
    },
    submitRemoveEvent() {
      const dateID = this.getDateString(this.clickedCell);
      this.removeFromLocalStorage(dateID);
      this.resetAddFormFields();
      this.resetCalendarStates();
    },
    resetAddFormFields() {
      this.onChangeEventName("");
      this.onChangeEventMembers("");
      this.onChangeEventDescription("");
    },
    resetCalendarStates() {
      this.$emit("resetStates");
    },
    saveInLocalStorage(formData) {
      this.$set(this.events, formData.date, formData);
      localStorage.setItem("events", JSON.stringify(this.events));
    },
    removeFromLocalStorage(dateID) {
      delete this.events[dateID];
      this.$emit("changeEvents", Object.assign({}, this.events));
      localStorage.setItem("events", JSON.stringify(this.events));
    },
    getFromLocalStorage(day, fieldName = "event") {
      const dateID = this.getDateString(day);
      return this.events[dateID] ? this.events[dateID][fieldName] : "";
    },
    calculatePopupCoordinates(top = 0, left = 0) {
      let popupTop = top;
      let popupLeft = left + this.cellOffset.width + 15;
      let popupArrowTop = 15;
      let popupArrowLeft = -15;
      let popupArrowRotate = 0;
      if (popupLeft + this.popupOffsetWidth > this.calendarOffset.width) {
        popupLeft -= this.cellOffset.width + this.popupOffsetWidth + 15;
        popupArrowLeft += this.popupOffsetWidth - 10;
        popupArrowRotate = 180;
      }
      if (
        popupTop + this.popupOffsetHeight - this.cellOffset.height >
        this.calendarOffset.height
      ) {
        popupTop -=
          Math.ceil(this.cellOffset.height / 2) +
          Math.ceil(this.popupOffsetHeight / 2);
        popupArrowTop -= this.cellOffset.height - this.popupOffsetHeight;
      }
      this.$set(this.popupCoordinates, "top", `${popupTop}px`);
      this.$set(this.popupCoordinates, "left", `${popupLeft}px`);
      this.$set(this.popupArrowCoordinates, "top", `${popupArrowTop}px`);
      this.$set(this.popupArrowCoordinates, "left", `${popupArrowLeft}px`);
      this.$set(
        this.popupArrowCoordinates,
        "transform",
        `rotate(${popupArrowRotate}deg)`
      );
    },
    getDayOfWeek(day) {
      const dayOfWeek = new Date(
        this.currentYear,
        this.currentMonth,
        day
      ).getDay();
      if (dayOfWeek === 0) return 7;
      return dayOfWeek;
    },
    getDayOfWeekName(day) {
      return daysOfWeek[day];
    },
    getDateString(day) {
      const dayWithZeros = this.addZeros(day);
      const monthWithZeros = this.addZeros(this.currentMonth + 1);
      return `${dayWithZeros}.${monthWithZeros}.${this.currentYear}`;
    },
    addZeros(value) {
      return `00${value}`.slice(-2);
    },
    isValid(value) {
      return value.length !== 0;
    },
    isFirstRow(day) {
      return day + (this.getDayOfWeek(1) - 1) <= 7;
    },
  },
};
</script>

<style scoped>
.popup {
  padding: 28px 12px 12px;
  position: absolute;
  width: 290px;
  background: #ffffff;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.25));
}
.popup__arrow {
  position: absolute;
  top: 9px;
  left: -14px;
  z-index: 1;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 15px solid #ffffff;
}
.add-event__wrapper,
.add-event__form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.add-event__fields-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.add-event__buttons-wrapper {
  display: flex;
  gap: 20px;
}
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
</style>
