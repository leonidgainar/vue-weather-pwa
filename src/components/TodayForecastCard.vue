<template>
  <div v-if="forecastHours">
    <h1 class="pb-4">24 Hours Forecast</h1>
    <v-card class="pb-4">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{ formatedDate }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="text-h6">{{ location }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row>
          <v-col
            :class="getTextColor(forecast.time)"
            cols="3"
            sm="2"
            md="1"
            v-for="forecast in forecastHours"
            :key="forecast.time"
          >
            <p class="text-center font-weight-bold mb-0">
              {{ getFormatedTime(forecast.time) }}
            </p>
            <v-img
              :src="forecast.condition.icon"
              :alt="forecast.condition.text"
              width="50"
              class="mx-auto"
            ></v-img>
            <p class="text-center font-weight-bold">
              {{ forecast.temp_c }}&deg;C
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
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
    this.getForecastData();
  },

  data() {
    return {
      forecastHours: null,
      date: null,
    };
  },

  computed: {
    formatedDate() {
      return new Date(this.date).toDateString();
    },
  },

  watch: {
    location() {
      this.getForecastData();
    },
  },

  methods: {
    getForecastData() {
      weatherService.getForecast(this.location, 1).then((response) => {
        const { hour, date } = response.forecastday[0];
        this.date = date;
        this.forecastHours = hour.map(({ time, temp_c, condition }) => {
          return {
            time,
            temp_c,
            condition,
          };
        });
      });
    },

    getFormatedTime(time) {
      return new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    getTextColor(time) {
      const currentHour = new Date().getHours();
      const referenceHour = new Date(time).getHours();

      if (referenceHour < currentHour) {
        return "grey--text";
      }
      if (referenceHour === currentHour) {
        return "green--text";
      }
      return "black--text";
    },
  },
};
</script>
