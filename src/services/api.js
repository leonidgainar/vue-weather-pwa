import axios from "axios";

export default axios.create({
  baseURL: "https://api.weatherapi.com/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
