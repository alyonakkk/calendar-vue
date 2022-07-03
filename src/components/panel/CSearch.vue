<template>
  <div class="panel__search search">
    <img class="search-icon" src="../../assets/search.svg" alt="search_icon" />
    <SearchForm @moveToMonth="moveToOtherMonth" />
  </div>
</template>

<script>
import SearchForm from "@/components/forms/SearchForm";
export default {
  name: "CSearch",
  components: { SearchForm },
  methods: {
    moveToOtherMonth(date) {
      this.$emit("moveToMonth", date);
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  gap: 10px;
}
</style>
