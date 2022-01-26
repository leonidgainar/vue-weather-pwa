<template>
  <v-app>
    <v-app-bar app color="#4DBA87" dark flat>
      <h2>VueWeather</h2>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="d-flex justify-center">
          <v-col v-if="isOffline" cols="11" md="10">
            <v-alert type="error" dismissible>
              You are offline now, please connect to network and refresh page.
            </v-alert>
          </v-col>
          <v-col cols="11" md="8" lg="6">
            <SearchLocation @location-changed="onLocationChanged" />
          </v-col>
        </v-row>
        <v-row v-if="currentLocation" class="d-flex justify-center">
          <v-col cols="12" lg="6">
            <CurrentWeatherCard :location="currentLocation" />
          </v-col>
          <v-col cols="12">
            <TodayForecastCard :location="currentLocation" />
          </v-col>
        </v-row>
      </v-container>
      <ForecastCardsContainer
        v-if="currentLocation"
        :location="currentLocation"
      />
    </v-main>
  </v-app>
</template>

<script>
import SearchLocation from "./components/SearchLocation";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCardsContainer from "./components/ForecastCardsContainer";
import TodayForecastCard from "./components/TodayForecastCard";

import weatherService from "./services/weather";
export default {
  name: "App",

  components: {
    SearchLocation,
    CurrentWeatherCard,
    ForecastCardsContainer,
    TodayForecastCard,
  },

  data: () => ({
    currentLocation: null,
    isOffline: null,
  }),

  created() {
    if (navigator.onLine) {
      this.isOffline = false;
    } else {
      this.isOffline = true;
    }

    if (!this.currentLocation && !this.isOffline) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setCurrentPosition,
          this.positionError,
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 0,
          }
        );
      }
    }
  },

  methods: {
    onLocationChanged(location) {
      if (location !== null) {
        this.currentLocation = location;
      }
    },

    setCurrentPosition(position) {
      const { latitude, longitude } = position.coords;
      weatherService
        .getLocations([latitude, longitude].join())
        .then((response) => {
          this.currentLocation = response[0];
        });
    },

    positionError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;

        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;

        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;

        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }
    },
  },
};
</script>
