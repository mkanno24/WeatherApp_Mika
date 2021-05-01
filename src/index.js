function formatDay(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    minutes = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatForecastDate(timestamp) {
  let forecasteDate = new Date(timestamp * 1000);
  let forecastDay = forecasteDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[forecastDay];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = ` <div class="row"> `;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weatherForecastDay">
                        ${formatForecastDate(forecastDay.dt)}
</div>

            <div class="forecastIcon">
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="50"> 
            </div>
            <div class="forecastTemperature">
            <span class="forecastTemperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span> 
            <span class="forecastTemperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
            </div>
          </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a5e503971f3cb1573fe109a966b147dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperatureDisplay");
  let humidityElement = document.querySelector("#humidity");
  let cityElement = document.querySelector("#city");
  let windElement = document.querySelector("#windSpeed");
  let descriptionElement = document.querySelector("#conditionDescription");
  let dateElement = document.querySelector("#dayAndTime");
  let iconElement = document.querySelector("#temperatureIcon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDay(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a5e503971f3cb1573fe109a966b147dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#citySearch");
  search(citySearchElement.value);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSearch);
