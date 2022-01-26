<template>
  <v-card v-if="weather" class="pb-4">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          Now in {{ location }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Data was updated:
          {{ new Date(weather.last_updated).toLocaleTimeString() }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          fab
          dark
          small
          depressed
          color="#4DBA87"
          title="Refresh"
          @click="getWeatherData"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card-text>
      <v-row>
        <v-col cols="6">
          <p class="text-h4">{{ weather.temp_c }}&deg;C</p>
          <p>
            <v-icon right>mdi-human-handsup</v-icon>
            Feels like {{ weather.feelslike_c }}&deg;C
          </p>
        </v-col>
        <v-col cols="6">
          <h3 class="text-center">{{ weather.condition.text }}</h3>
          <v-img
            :src="weather.condition.icon"
            :alt="weather.condition.text"
            width="64"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row>
      <v-col class="py-0" cols="12" sm="6">
        <v-list-item title="Cloud cover">
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Cloud cover: {{ weather.cloud }} %
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Visibility">
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Visibility: {{ weather.vis_km }} km
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Wind speed">
          <v-list-item-icon>
            <v-icon>mdi-weather-windy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Wind speed: {{ weather.wind_kph }} km/h
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Wind direction">
          <v-list-item-icon>
            <v-icon>mdi-sign-direction</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Wind direction: {{ weather.wind_dir }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-col>
      <v-col class="py-0" cols="12" sm="6">
        <v-list-item title="Humidity">
          <v-list-item-icon>
            <v-icon>mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Humidity: {{ weather.humidity }} %
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Precipitation amount">
          <v-list-item-icon>
            <v-icon>mdi-umbrella</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Precipitation amount: {{ weather.precip_mm }} mm
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="UV Index">
          <v-list-item-icon>
            <v-icon>mdi-sunglasses</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            UV Index: {{ weather.uv }} UV
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Pressure">
          <v-list-item-icon>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Presure: {{ weather.pressure_mb }} mbar
          </v-list-item-subtitle>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import weatherService from "../services/weather";
export default {
  props: {
    location: {
      type: String,
      required: true,
    },
  },

  created() {
    this.getWeatherData();
  },

  data() {
    return {
      weather: null,
    };
  },

  watch: {
    location() {
      this.getWeatherData();
    },
  },

  methods: {
    getWeatherData() {
      weatherService.getCurrentWeather(this.location).then((response) => {
        this.weather = response;
      });
    },
  },
};
</script>
