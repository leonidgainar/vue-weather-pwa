<template>
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
        <v-col cols="6">
          <p class="text-h5">
            <v-icon>mdi-thermometer-chevron-up</v-icon>
            max. {{ maxtemp_c }}&deg;C
          </p>
          <p class="text-h5">
            <v-icon>mdi-thermometer-chevron-down</v-icon>
            min. {{ mintemp_c }}&deg;C
          </p>
        </v-col>
        <v-col cols="6">
          <h3 class="text-center">{{ condition.text }}</h3>
          <v-img
            :src="condition.icon"
            :alt="condition.text"
            width="64"
            class="mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-row>
      <v-col class="py-0" cols="12" sm="6" md="12" xl="6">
        <v-list-item title="Average visibility">
          <v-list-item-icon>
            <v-icon>mdi-eye</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Avg. visibility: {{ avgvis_km }} km
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Max wind speed">
          <v-list-item-icon>
            <v-icon>mdi-weather-windy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Max. wind speed: {{ maxwind_kph }} km/h
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item title="Average humidity">
          <v-list-item-icon>
            <v-icon>mdi-water-percent</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Avg. humidity: {{ avghumidity }} %
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Total precipitation amount">
          <v-list-item-icon>
            <v-icon>mdi-umbrella</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Precipitation amount: {{ totalprecip_mm }} mm
          </v-list-item-subtitle>
        </v-list-item>
      </v-col>

      <v-col class="py-0" cols="12" sm="6" md="12" xl="6">
        <v-list-item title="Sunrise">
          <v-list-item-icon>
            <v-icon>mdi-weather-sunset-up</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle> Sunrise: {{ sunrise }} </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Sunset">
          <v-list-item-icon>
            <v-icon>mdi-weather-sunset-down</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle> Sunset: {{ sunset }} </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Chance of rain">
          <v-list-item-icon>
            <v-icon>mdi-weather-rainy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Chance of rain: {{ daily_chance_of_rain }} %
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item title="Chance of snow">
          <v-list-item-icon>
            <v-icon>mdi-weather-snowy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>
            Chance of snow: {{ daily_chance_of_snow }} %
          </v-list-item-subtitle>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    mintemp_c: {
      type: Number,
      required: true,
    },
    maxtemp_c: {
      type: Number,
      required: true,
    },
    totalprecip_mm: {
      type: Number,
      required: true,
    },
    avghumidity: {
      type: Number,
      required: true,
    },
    avgvis_km: {
      type: Number,
      required: true,
    },
    maxwind_kph: {
      type: Number,
      required: true,
    },
    condition: {
      type: Object,
      required: true,
    },
    daily_chance_of_rain: {
      type: Number,
      required: true,
    },
    daily_chance_of_snow: {
      type: Number,
      required: true,
    },
    sunrise: {
      type: String,
      required: true,
    },
    sunset: {
      type: String,
      required: true,
    },
  },

  computed: {
    formatedDate() {
      return new Date(this.date).toDateString();
    },
  },
};
</script>
