<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <form @submit.prevent="handleCreateEvent" class="quick-add__form">
      <DefaultInput
        name="quickAdd"
        rules="required|quickAddField"
        :value="quickAddFieldValue"
        placeholder="18.07.2022, кутеж, Алёна"
        @input="onChangeQuickAddField"
      />
      <WhiteButton :is-disabled="invalid" type="submit" title="Создать" />
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import getObjectAssign from "@/helpers/getObjectAssign";
import DefaultInput from "@/shared/UI/inputs/DefaultInput";
import WhiteButton from "@/shared/UI/buttons/WhiteButton";

export default {
  name: "QuicklyAddEventForm",
  components: { WhiteButton, DefaultInput },
  data() {
    return {
      quickAddFieldValue: "",
    };
  },
  computed: {
    ...mapGetters(["getEvents", "getIsActiveQuickPopup"]),
  },
  watch: {
    getIsActiveQuickPopup() {
      this.quickAddFieldValue = "";
      this.$refs.form.reset();
    },
  },
  methods: {
    ...mapActions(["saveInLocalStorage"]),
    onChangeQuickAddField(value) {
      this.quickAddFieldValue = value;
    },
    handleCreateEvent() {
      const valueSplit = this.quickAddFieldValue.split(",");
      const eventDate = valueSplit[0];
      const eventName = valueSplit[1];
      const eventMember = valueSplit[2];
      const hasEventDay = this.getEvents[eventDate];
      if (!hasEventDay) {
        const newEvent = {
          event: eventName,
          date: eventDate,
          members: eventMember,
          description: "",
        };
        this.createEvent(newEvent);
        this.$emit("moveToMonth", eventDate);
      } else {
        this.$emit("openWindowPopup");
      }
      this.$emit("closeQuickAddPopup");
    },
    createEvent(newEvent) {
      const eventsList = getObjectAssign({
        ...this.getEvents,
        [newEvent.date]: newEvent,
      });
      this.saveInLocalStorage(eventsList);
    },
  },
};
</script>

<style scoped>
.quick-add__form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
