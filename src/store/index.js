import Vue from "vue";
import Vuex from "vuex";
import addZeros from "@/helpers/addZeros";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: JSON.parse(localStorage.getItem("events")) ?? {},
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    dayEvent: {
      event: "",
      date: "",
      members: "",
      description: "",
    },
    clickedCell: null,
    isPopupActive: false,
    isActiveQuickPopup: false,
  },
  getters: {
    getEvents: (state) => state.events,
    getCurrentMonth: (state) => state.currentMonth,
    getCurrentYear: (state) => state.currentYear,
    getDayEvent: (state) => state.dayEvent,
    getClickedCell: (state) => state.clickedCell,
    getIsActivePopup: (state) => state.isPopupActive,
    getIsActiveQuickPopup: (state) => state.isActiveQuickPopup,
    getIsActiveWindowPopup: (state) => state.isActiveWindowPopup,
    getDateString: (state) => {
      return function (day) {
        const dayWithZeros = addZeros(day);
        const monthWithZeros = addZeros(state.currentMonth + 1);
        return `${dayWithZeros}.${monthWithZeros}.${state.currentYear}`;
      };
    },
    getFromLocalStorage: (state, getters) => {
      return function (day, fieldName = "event") {
        const dateID = getters.getDateString(day);
        return state.events[dateID] ? state.events[dateID][fieldName] : "";
      };
    },
    getDayOfWeek: (state) => {
      return function (day) {
        const dayOfWeek = new Date(
          state.currentYear,
          state.currentMonth,
          day
        ).getDay();
        if (dayOfWeek === 0) return 7;
        return dayOfWeek;
      };
    },
  },
  mutations: {
    setEvents(state, payload) {
      state.events = payload;
    },
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    setEventDay(state, payload) {
      state.dayEvent = payload;
    },
    setEventDayDate(state, payload) {
      state.dayEvent.date = payload;
    },
    setClickedCell(state, payload) {
      state.clickedCell = payload;
    },
    setIsActivePopup(state, payload) {
      state.isPopupActive = payload;
    },
    setIsActiveQuickPopup(state, payload) {
      state.isActiveQuickPopup = payload;
    },
    resetEventDay(state) {
      state.dayEvent = {
        ...state.dayEvent,
        event: "",
        members: "",
        description: "",
      };
    },
    resetStateData(state) {
      state.isPopupActive = false;
      state.isActiveQuickPopup = false;
      state.clickedCell = null;
    },
  },
  actions: {
    saveInLocalStorage({ commit }, eventList) {
      commit("setEvents", eventList);
      localStorage.setItem("events", JSON.stringify(eventList));
    },
    removeFromLocalStorage({ commit }, eventList) {
      commit("setEvents", eventList);
      localStorage.setItem("events", JSON.stringify(eventList));
    },
  },
});
