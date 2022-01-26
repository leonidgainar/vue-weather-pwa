<template>
  <v-container v-if="forecastDays">
    <v-row>
      <v-col>
        <h1>3 Days Forecast</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="forecast in forecastDays"
        :key="forecast.date"
      >
        <ForecastCard
          v-bind="{
            location,
            date: forecast.date,
            mintemp_c: forecast.mintemp_c,
            maxtemp_c: forecast.maxtemp_c,
            totalprecip_mm: forecast.totalprecip_mm,
            avghumidity: forecast.avghumidity,
            avgvis_km: forecast.avgvis_km,
            maxwind_kph: forecast.maxwind_kph,
            condition: forecast.condition,
            daily_chance_of_rain: forecast.daily_chance_of_rain,
            daily_chance_of_snow: forecast.daily_chance_of_snow,
            sunrise: forecast.sunrise,
            sunset: forecast.sunset,
          }"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import weatherService from "../services/weather";
import ForecastCard from "./ForecastCard";

export default {
  components: {
    ForecastCard,
  },

  props: {
    location: {
      type: String,
      required: true,
    },
  },

  created() {
    this.getForecastData();
  },

  data() {
    return {
      forecastDays: null,
    };
  },

  watch: {
    location() {
      this.getForecastData();
    },
  },

  methods: {
    getForecastData() {
      weatherService.getForecast(this.location, 3).then((response) => {
        const { forecastday } = response;
        this.forecastDays = forecastday.map(({ day, astro, date }) => {
          return {
            date,
            mintemp_c: day.mintemp_c,
            maxtemp_c: day.maxtemp_c,
            totalprecip_mm: day.totalprecip_mm,
            avghumidity: day.avghumidity,
            avgvis_km: day.avgvis_km,
            maxwind_kph: day.maxwind_kph,
            condition: day.condition,
            daily_chance_of_rain: day.daily_chance_of_rain,
            daily_chance_of_snow: day.daily_chance_of_snow,
            sunrise: astro.sunrise,
            sunset: astro.sunset,
          };
        });
      });
    },
  },
};
</script>
