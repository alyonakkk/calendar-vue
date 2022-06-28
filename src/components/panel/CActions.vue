<template>
  <div class="panel__actions">
    <div class="panel__wrapper">
      <DefaultButton :title="'Добавить'" @click="handleQuickAddEvent" />
      <DefaultPopup :is-open="isActiveQuickPopup" @close="closeQuickAddPopup">
        <form class="quick-add__form">
          <DefaultInput
            :value="quickAddFieldValue"
            :placeholder="'25 ноября, Кутеж, Серж'"
            @input="onChangeQuickAddField"
          />
          <WhiteButton :title="'Создать'" @click="handleCreateEvent" />
        </form>
      </DefaultPopup>
    </div>
    <DefaultButton :title="'Обновить'" @click="handleReload" />
    <WindowPopup :is-open="isActiveWindowPopup" @close="closeWindowPopup">
      <p>Плак-плак! В этот день у вас уже запланировано событие! :(</p>
    </WindowPopup>
  </div>
</template>

<script>
import DefaultButton from "@/shared/UI/buttons/DefaultButton";
import WhiteButton from "@/shared/UI/buttons/WhiteButton";
import DefaultInput from "@/shared/UI/inputs/DefaultInput";
import DefaultPopup from "@/shared/UI/popups/defaultPopup/DefaultPopup";
import WindowPopup from "@/shared/UI/popups/windowPopup/WindowPopup";

export default {
  name: "CActions",
  components: {
    WindowPopup,
    DefaultPopup,
    DefaultInput,
    WhiteButton,
    DefaultButton,
  },
  props: {
    events: {
      type: Object,
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
  },
  data() {
    return {
      isActiveQuickPopup: false,
      isActiveWindowPopup: false,
      quickAddFieldValue: "",
    };
  },
  watch: {
    isActiveQuickPopup() {
      this.quickAddFieldValue = "";
    },
  },
  methods: {
    handleQuickAddEvent() {
      this.isActiveQuickPopup = true;
    },
    onChangeQuickAddField(value) {
      this.quickAddFieldValue = value;
    },
    handleCreateEvent() {
      const valueSplit = this.quickAddFieldValue.split(",");
      const eventDate = valueSplit[0];
      const eventName = valueSplit[1];
      const eventMember = valueSplit[2];
      const hasEventDay = Object.values(this.events).find(
        (event) => event.date === eventDate
      );
      if (!hasEventDay) {
        const newEvent = {
          event: eventName,
          date: eventDate,
          members: eventMember,
          description: "",
        };
        this.saveInLocalStorage(newEvent);
        this.$emit("click", eventDate);
      } else {
        this.isActiveWindowPopup = true;
      }
      this.closeQuickAddPopup();
    },
    saveInLocalStorage(newEvent) {
      this.$set(this.events, newEvent.date, newEvent);
      localStorage.setItem("events", JSON.stringify(this.events));
    },
    handleReload() {
      location.reload();
    },
    closeQuickAddPopup() {
      this.isActiveQuickPopup = false;
    },
    closeWindowPopup() {
      this.isActiveWindowPopup = false;
    },
  },
};
</script>

<style scoped>
.panel__actions {
  display: flex;
  gap: 10px;
}
.panel__wrapper {
  position: relative;
}
.quick-add__form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
