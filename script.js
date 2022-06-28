//Fetch from the API
let weather = {
  apiKey: "0cbee5f186e24e2589e22537222306",
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    //Reference for adding new CITY CARD
    const itemsContainer = document.getElementById("tempCard");
    console.log(itemsContainer);
    //Time formatting
    const timeFormat = data.location.localtime;
    const newTime = new Date(timeFormat)
      .toLocaleTimeString("it-IT")
      .slice(0, 5);
    //Adding a new card
    const itemHTML = `<div class="myCard d-flex flex-column" id="${
      data.location.name
    }" onclick="window.location.href = 'chosenCity.html?location=${
      data.location.name
    }'">
            <div class="row">
                <div class="col">
                    <h2 class="cityName">${data.location.name}</h2>
                    <p class="time">${newTime}</p>
                    <h3 class="currentWeather" id="currentWeather">${
                      data.current.condition.text
                    }</h3>
                </div>
                <div class="col">
                    <h1 class="tempCard">${Math.round(
                      data.current.temp_c
                    )}°C</h1>
                </div>
            </div>
                <div class="row mt-auto justify-content-end">
                    <div class="col-3 leftTemp">
                        <p class="max">Max.${Math.round(
                          data.forecast.forecastday[0].day.maxtemp_c
                        )}°</p>
                    </div>
                    <div class="col-3 rightTemp">
                        <p class="min">Min.${Math.round(
                          data.forecast.forecastday[0].day.mintemp_c
                        )}°</p>
                    </div>
                </div>
            </div>`;
    itemsContainer.innerHTML += itemHTML;
  },
};
//Switching on and off the form
function toggleForm() {
  const form = document.querySelector(".addForm");
  form.classList.toggle("hidden");
}

//Add city name to the search bar
function makeNewCard() {
  const addCityName = document.querySelector("#addCityName").value;
  weather.fetchWeather(addCityName);
}
