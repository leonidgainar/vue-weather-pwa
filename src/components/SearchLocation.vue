<template>
  <v-autocomplete
    v-model="location"
    :items="locations"
    :search-input.sync="searchInput"
    hide-selected
    hide-no-data
    clearable
    label="Search a city/location"
    placeholder="Start typing to search"
    prepend-icon="mdi-map-marker"
  >
  </v-autocomplete>
</template>

<script>
import weatherService from "../services/weather";
export default {
  name: "SearchLocation",

  data: () => ({
    searchInput: null,
    location: null,
    locations: [],
  }),

  watch: {
    location() {
      this.$emit("location-changed", this.location);
    },
    searchInput(val) {
      this.locations = null;
      if (val !== "" && val !== null) {
        weatherService.getLocations(val).then((response) => {
          this.locations = response;
        });
      }
    },
  },
};
</script>
