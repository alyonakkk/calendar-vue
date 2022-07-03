<template>
  <div class="panel__actions">
    <div class="panel__wrapper">
      <DefaultButton title="Добавить" @click="handleQuickAddEvent" />
      <DefaultPopup
        :is-open="getIsActiveQuickPopup"
        @close="toggleQuickAddEventPopup(false)"
      >
        <QuicklyAddEventForm
          @moveToMonth="moveToOtherMonth"
          @closeQuickAddPopup="toggleQuickAddEventPopup(false)"
          @openWindowPopup="toggleWindowPopup(true)"
        />
      </DefaultPopup>
    </div>
    <DefaultButton title="Обновить" @click="handleReload" />
    <WindowPopup
      :is-open="isActiveWindowPopup"
      @close="toggleWindowPopup(false)"
    >
      <p>Плак-плак! В этот день у вас уже запланировано событие! :(</p>
    </WindowPopup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DefaultButton from "@/shared/UI/buttons/DefaultButton";
import DefaultPopup from "@/shared/UI/popups/defaultPopup/DefaultPopup";
import WindowPopup from "@/shared/UI/popups/windowPopup/WindowPopup";
import QuicklyAddEventForm from "@/components/forms/QuicklyAddEventForm";

export default {
  name: "CActions",
  components: {
    QuicklyAddEventForm,
    WindowPopup,
    DefaultPopup,
    DefaultButton,
  },
  data() {
    return {
      isActiveWindowPopup: false,
    };
  },
  computed: {
    ...mapGetters(["getIsActiveQuickPopup"]),
  },
  methods: {
    ...mapMutations(["setIsActiveQuickPopup"]),
    handleQuickAddEvent() {
      this.toggleQuickAddEventPopup(true);
    },
    handleReload() {
      location.reload();
    },
    moveToOtherMonth(date) {
      this.$emit("moveToMonth", date);
    },
    toggleQuickAddEventPopup(value) {
      this.setIsActiveQuickPopup(value);
    },
    toggleWindowPopup(value) {
      this.isActiveWindowPopup = value;
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
</style>
