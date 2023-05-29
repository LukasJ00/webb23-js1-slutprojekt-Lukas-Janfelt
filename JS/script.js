const form = document.querySelector('#weatherForm');
const searchResultDiv = document.querySelector('#result-container');
const errorH3 = document.querySelector('#error');
const increaseButton = document.querySelector('#increase-button');
const decreaseButton = document.querySelector('#decrease-button');
const intervalInput = document.querySelector('#interval-input');

form.addEventListener('submit', fetchWeather);
increaseButton.addEventListener('click', increaseInterval);
decreaseButton.addEventListener('click', decreaseInterval);
intervalInput.addEventListener('change', updateInterval);

let forecastInterval = 12; // Standardintervall på 12 timmar
const minForecastInterval = 3; // Minsta intervall på 3 timmar
let city = '';

function showWeather(weather) {
  console.log(weather);

  searchResultDiv.innerHTML = '';

  const cityNameElement = document.getElementById('city-name');
  cityNameElement.textContent = weather.city.name;

  const forecastData = weather.list;

  for (let i = 0; i < forecastInterval; i += 3) {
    const forecastItem = forecastData[i / 3];
    const forecastItemTime = new Date(forecastItem.dt * 1000);
    const forecastItemHour = forecastItemTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    const forecastItemTemperature = forecastItem.main.temp;
    const forecastItemHumidity = forecastItem.main.humidity;
    const forecastItemWindSpeed = forecastItem.wind.speed;

    const forecastItemContainer = document.createElement('div');
    forecastItemContainer.classList.add('forecast-item');

    const forecastItemTimeElement = document.createElement('h3');
    forecastItemTimeElement.textContent = forecastItemHour;
    forecastItemContainer.append(forecastItemTimeElement);

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temp: ${forecastItemTemperature} °C`;
    forecastItemContainer.append(temperatureElement);

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${forecastItemHumidity} %`;
    forecastItemContainer.append(humidityElement);

    const windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${forecastItemWindSpeed} m/s`;
    forecastItemContainer.append(windSpeedElement);

    const weatherInfo = forecastItem.weather[0];
    if (weatherInfo && weatherInfo.icon) {
      const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`;
      const iconInfo = document.createElement('h3');
      iconInfo.textContent = weatherInfo.description;
      const icon = document.createElement('img');
      icon.src = iconUrl;
      forecastItemContainer.append(icon);
      forecastItemContainer.append(iconInfo);
    }

    searchResultDiv.append(forecastItemContainer);
  }

  searchResultDiv.style.display = 'flex';
}

function showErrorMessage(message) {
  errorH3.textContent = message;
  searchResultDiv.style.display = 'none';
}

function fetchWeather(event) {
  event.preventDefault();
  searchResultDiv.innerHTML = '';
  errorH3.textContent = '';
  city = event.target.elements[0].value;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`;

  fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showWeather(data);
    })
    .catch((error) => {
      console.log(error);
      showErrorMessage('City not found');
    });
}

function increaseInterval() {
  forecastInterval += 3;
  updateIntervalInput();
  fetchWeatherByCity(city);
}

function decreaseInterval() {
  if (forecastInterval - 3 >= minForecastInterval) {
    forecastInterval -= 3;
    updateIntervalInput();
    fetchWeatherByCity(city);
  }
}

function updateInterval() {
  const newForecastInterval = parseInt(intervalInput.value);
  if (newForecastInterval >= minForecastInterval) {
    forecastInterval = newForecastInterval;
    fetchWeatherByCity(city);
  }
}

function updateIntervalInput() {
  intervalInput.value = forecastInterval.toString();
}

function fetchWeatherByCity(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`;

  fetch(weatherUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showWeather(data);
    })
    .catch((error) => {
      console.log(error);
      showErrorMessage('City not found');
    });
}








// const form = document.querySelector('#weatherForm');
// const searchResultDiv = document.querySelector('#result-container');
// const errorH3 = document.querySelector('#error');

// form.addEventListener("submit", fetchWeather);

// function showWeather(weather) {
//     console.log(weather);
//     const city = document.createElement('h2');
//     city.textContent = weather.name;
//     searchResultDiv.append(city);
  
//     const temp = document.createElement('h3');
//     temp.textContent = "Temp: " + weather.main.temp + " °C";
//     searchResultDiv.append(temp);
  
//     const humidity = document.createElement('h3');
//     humidity.textContent = "Humidity: " + weather.main.humidity + " %";
//     searchResultDiv.append(humidity);
  
//     const wind = document.createElement('h3');
//     const windSpeedMps = weather.wind.speed * 0.44704; 
//     wind.textContent = "Wind: " + windSpeedMps.toFixed(2) + " m/s, " + weather.wind.deg + "°";
//     searchResultDiv.append(wind);
  
//     const weatherInfo = weather.weather[0];
//     if (weatherInfo && weatherInfo.icon) {
//       const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`; 
//       const iconInfo = document.createElement('h3');
//       iconInfo.textContent = weatherInfo.description;
//       const icon = document.createElement('img');
//       icon.src = iconUrl; 
//       searchResultDiv.append(iconInfo);
//       searchResultDiv.append(icon);
//     }
//     searchResultDiv.style.display = "block";
// }

// function showErrorMessage(message) {
//     errorH3.textContent = message;
//     searchResultDiv.style.display = "none";
// }


// function fetchWeather(event) {
//     event.preventDefault();
//     searchResultDiv.innerHTML = ''; 
//     errorH3.textContent = '';
//     const city = event.target.elements[0].value;
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`;
   
//     fetch(weatherUrl)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('City not found');
//             }
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             showWeather(data);
//         })
//         .catch((error) => {
//             console.log(error);
//             showErrorMessage('City not found');
//         });
// }















