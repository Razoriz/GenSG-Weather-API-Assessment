//to fetch again the weather data
const countryName = location.search.split("=")[1];
let weather = {
  apiKey: "0cbee5f186e24e2589e22537222306",
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        this.apiKey +
        "&q=" +
        countryName +
        "&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    console.log(data);
    console.log(data.location.name);

    //City Name
    const cityName = document.getElementById("cityName");
    cityName.innerText = data.location.name;
    //Date formatting
    const dateFormat = data.location.localtime;
    const newFormat = new Date(dateFormat).toString();
    document.querySelector(".date").innerText = newFormat.slice(4, 16);
    //Weather Image
    const weatherImage = document.getElementById("weatherImage");
    weatherImage.src = data.current.condition.icon;
    //Current Temp
    const currentTemp = document.getElementById("currentTemp");
    currentTemp.innerText = `${Math.round(data.current.temp_c)}°C`;
    //Current Weather
    const currentWeather = document.getElementById("currentWeather");
    currentWeather.innerText = data.current.condition.text;
    //Minimum Temperature
    const minTemp = document.getElementById("temp2");
    minTemp.innerText = `${Math.round(
      data.forecast.forecastday[0].day.mintemp_c
    )}° Min`;
    //Maximum Temperature
    const maxTemp = document.getElementById("temp3");
    maxTemp.innerText = `${Math.round(
      data.forecast.forecastday[0].day.maxtemp_c
    )}° Max`;

    //UV Indicator Value
    const uvIndicator = document.getElementById("lowValue");
    let uvData = "";
    if (data.current.uv < 3) {
      uvData = `${data.current.uv} Low`;
    } else if (data.current.uv < 6) {
      uvData = `${data.current.uv} Moderate`;
    } else if (data.current.uv < 8) {
      uvData = `${data.current.uv} High`;
    } else if (data.current.uv < 11) {
      uvData = `${data.current.uv} Very High`;
    } else {
      uvData = `${data.current.uv} Extreme`;
    }
    uvIndicator.innerText = uvData;
    //UV Indicator Description
    const uvInfo = document.getElementById("lowInfo");
    let uvDesc = "";
    if (data.current.uv < 3) {
      uvDesc = "Low level during all the day";
    } else if (data.current.uv < 6) {
      uvDesc = "Moderate level during all the day";
    } else if (data.current.uv < 8) {
      uvDesc = "High level during all the day";
    } else if (data.current.uv < 11) {
      uvDesc = "Very High level during all the day";
    } else {
      uvDesc = "Extreme level during all the day";
    }
    uvInfo.innerText = uvDesc;
    //Feels like Temperature Value
    const feelsLike = document.getElementById("feelsLikeValue");
    feelsLike.innerText = `${Math.round(data.current.feelslike_c)}°`;
    //Pressure Value
    const pressure = document.getElementById("pressureValue");
    pressure.innerText = `${data.current.pressure_mb} hPa`;
  },
};
weather.fetchWeather();
