<template>
  <form class="search__form">
    <CloseButton
      :styles="{
        top: 'calc(50% - 3px)',
      }"
      @click="resetSearchField"
    />
    <DefaultInput
      :value="searchValue"
      @input="onChangeSearchValue"
      @focus="onFocusSearchInput"
      @blur="onBlurSearchInput"
      placeholder="Поиск"
    />
    <div v-show="isActiveSearchList" class="search__select">
      <ul class="search__list">
        <li
          v-for="event in searchedList"
          @click="handleSearchItem(event.date)"
          class="search__item"
          :key="event.date"
        >
          <p class="search__name">{{ event.event }}</p>
          <p class="search__date">{{ event.date }}</p>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import CloseButton from "@/shared/UI/buttons/CloseButton";
import DefaultInput from "@/shared/UI/inputs/DefaultInput";

export default {
  name: "SearchForm",
  components: { CloseButton, DefaultInput },
  data() {
    return {
      isActiveSearchList: false,
      isFocus: false,
      searchValue: "",
      searchedList: [],
    };
  },
  computed: {
    ...mapGetters(["getEvents"]),
  },
  watch: {
    searchValue(value) {
      if (value) {
        this.searchedList = Object.values(this.getEvents).filter(
          ({ event, date }) => event.includes(value) || date.includes(value)
        );
      } else {
        this.searchedList = [];
      }
    },
    searchedList(value) {
      this.isActiveSearchList = value.length !== 0;
    },
  },
  methods: {
    onChangeSearchValue(value) {
      this.searchValue = value;
    },
    onFocusSearchInput() {
      this.isFocus = true;
    },
    onBlurSearchInput() {
      this.isFocus = false;
    },
    handleSearchItem(dateID) {
      this.$emit("moveToMonth", dateID);
      this.resetSearchField();
    },
    resetSearchField() {
      this.searchValue = "";
    },
  },
};
</script>

<style scoped>
.search__form {
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
}
.search__select {
  padding: 6px;
  position: absolute;
  top: 45px;
  z-index: 10;
  width: 100%;
  background: #ffffff;
  filter: drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.25));
}

.search__select:before {
  content: "";
  position: absolute;
  top: -19px;
  left: 25px;
  z-index: 1;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-right: 15px solid #ffffff;
  transform: rotate(90deg);
}

.search__list {
  max-height: 318px;
  overflow: auto;
  list-style: none;
}

.search__item {
  padding: 4px 9px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search__item:hover {
  background: #27a1ff;
  color: #ffffff;
  cursor: pointer;
}

.search__name {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
}

.search__date {
  font-size: 12px;
  font-weight: 300;
  line-height: 14px;
}
</style>
