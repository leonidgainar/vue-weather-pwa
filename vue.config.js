module.exports = {
  pwa: {
    name: "VueWeather",
    themeColor: "#4DBA87",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  transpileDependencies: ["vuetify"],
};
