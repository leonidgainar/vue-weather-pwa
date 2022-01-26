import api from "../services/api";

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;

export default {
  getLocations(query) {
    return api.get(`search.json?key=${API_KEY}&q=${query}`).then((response) => {
      const locations = response.data.map((location) => {
        return location.name;
      });
      return locations;
    });
  },

  getCurrentWeather(location) {
    return api
      .get(`current.json?key=${API_KEY}&q=${location}`)
      .then((response) => {
        return response.data.current;
      });
  },

  getForecast(location) {
    return api
      .get(`forecast.json?key=${API_KEY}&q=${location}&days=3`)
      .then((response) => {
        return response.data.forecast;
      });
  },
};
