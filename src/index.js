function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperatureDisplay");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#conditionDescription");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
let apiKey = "a5e503971f3cb1573fe109a966b147dd";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
