<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <form class="add-event__form" @submit.prevent="submitAddEvent">
      <div class="add-event__fields-wrapper">
        <div class="add-event__wrapper">
          <DefaultInput
            rules="required"
            name="eventName"
            :value="getDayEvent.event"
            placeholder="Событие"
            :clicked-cell="getClickedCell"
            @input="onChangeEventName"
          />
          <DefaultInput
            name="eventDate"
            :value="getDayEvent.date"
            :is-disabled="true"
            :clicked-cell="getClickedCell"
          />
          <DefaultInput
            rules="required"
            name="eventMembers"
            :value="getDayEvent.members"
            placeholder="Имена участников"
            :clicked-cell="getClickedCell"
            @input="onChangeEventMembers"
          />
        </div>
        <DefaultTextarea
          name="eventDescription"
          :value="getDayEvent.description"
          @input="onChangeEventDescription"
          placeholder="Описание"
        />
      </div>
      <div class="add-event__buttons-wrapper">
        <WhiteButton :is-disabled="invalid" title="Готово" type="submit" />
        <WhiteButton title="Удалить" @click="submitRemoveEvent" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import getObjectAssign from "@/helpers/getObjectAssign";
import DefaultInput from "@/shared/UI/inputs/DefaultInput";
import DefaultTextarea from "@/shared/UI/textareas/DefaultTextarea";
import WhiteButton from "@/shared/UI/buttons/WhiteButton";

export default {
  name: "AddEventForm",
  components: { WhiteButton, DefaultTextarea, DefaultInput },
  computed: {
    ...mapGetters([
      "getEvents",
      "getDayEvent",
      "getClickedCell",
      "getDateString",
    ]),
  },
  watch: {
    getClickedCell() {
      this.$refs.form.reset();
    },
  },
  methods: {
    ...mapActions(["saveInLocalStorage", "removeFromLocalStorage"]),
    ...mapMutations(["setEventDay", "resetEventDay", "resetStateData"]),
    onChangeEventName(value) {
      this.setEventDay({
        ...this.getDayEvent,
        event: value,
      });
    },
    onChangeEventMembers(value) {
      this.setEventDay({
        ...this.getDayEvent,
        members: value,
      });
    },
    onChangeEventDescription(value) {
      this.setEventDay({
        ...this.getDayEvent,
        description: value,
      });
    },
    submitAddEvent() {
      const formData = {
        event: this.getDayEvent.event,
        date: this.getDayEvent.date,
        members: this.getDayEvent.members,
        description: this.getDayEvent.description,
      };
      const eventsList = getObjectAssign({
        ...this.getEvents,
        [this.getDayEvent.date]: formData,
      });
      this.saveInLocalStorage(eventsList);
      this.resetStateData();
    },
    submitRemoveEvent() {
      const dateID = this.getDateString(this.getClickedCell);
      const eventsList = getObjectAssign(this.getEvents);
      delete eventsList[dateID];
      this.removeFromLocalStorage(eventsList);
      this.resetStateData();
    },
  },
};
</script>

<style scoped>
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
</style>
