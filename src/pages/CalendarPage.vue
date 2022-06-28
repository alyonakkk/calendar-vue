<template>
  <div class="container">
    <div class="wrapper">
      <CPanel
        :events="events"
        :current-month="currentMonth"
        :current-year="currentYear"
        @changeEvents="onChangeEventsList"
        @changeMonth="onChangeCurrentMonth"
        @changeYear="onChangeCurrentYear"
      />
      <CNavigation
        :current-month="currentMonth"
        :current-year="currentYear"
        @changeMonth="onChangeCurrentMonth"
        @changeYear="onChangeCurrentYear"
      />
      <CCalendar
        :events="events"
        :is-popup-active="isPopupActive"
        :clicked-cell="clickedCell"
        :current-month="currentMonth"
        :current-year="currentYear"
        :event-name="eventName"
        :event-date="eventDate"
        :event-members="eventMembers"
        :event-desc="eventDesc"
        @changeEvents="onChangeEventsList"
        @changeEventName="onChangeEventName"
        @changeEventDate="onChangeEventDate"
        @changeEventMembers="onChangeEventMembers"
        @changeEventDescription="onChangeEventDescription"
        @changeClickedCell="onChangeClickedCell"
        @changeIsActivePopup="onChangeIsActivePopup"
        @resetStates="resetCalendarStates"
      />
    </div>
  </div>
</template>

<script>
import CPanel from "@/components/panel/CPanel";
import CNavigation from "@/components/navigation/CNavigation";
import CCalendar from "@/components/calendar/CCalendar";

export default {
  components: {
    CCalendar,
    CNavigation,
    CPanel,
  },
  data() {
    return {
      events: JSON.parse(localStorage.getItem("events")) ?? {},
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      eventName: "",
      eventDate: "",
      eventMembers: "",
      eventDesc: "",
      clickedCell: null,
      isPopupActive: false,
    };
  },
  watch: {
    currentMonth() {
      this.resetCalendarStates();
    },
  },
  methods: {
    onChangeEventsList(value) {
      this.events = value;
    },
    onChangeClickedCell(value) {
      this.clickedCell = value;
    },
    onChangeIsActivePopup(value) {
      this.isPopupActive = value;
    },
    onChangeCurrentMonth(value) {
      this.currentMonth = value;
    },
    onChangeCurrentYear(value) {
      this.currentYear = value;
    },
    onChangeEventName(value) {
      this.eventName = value;
    },
    onChangeEventDate(value) {
      this.eventDate = value;
    },
    onChangeEventMembers(value) {
      this.eventMembers = value;
    },
    onChangeEventDescription(value) {
      this.eventDesc = value;
    },
    resetCalendarStates() {
      this.isPopupActive = false;
      this.clickedCell = null;
    },
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
</style>
