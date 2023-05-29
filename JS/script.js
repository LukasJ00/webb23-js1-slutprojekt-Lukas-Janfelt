const form = document.querySelector('#weatherForm');
const searchResultDiv = document.querySelector('#result-container');
const errorH3 = document.querySelector('#error');
const increaseButton = document.querySelector('#increase-button');
const decreaseButton = document.querySelector('#decrease-button');
const intervalInput = document.querySelector('#interval-input');
intervalInput.setAttribute('max', '12');

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

  // Skapa element för nuvarande väder
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('forecast-item');

  const currentWeatherTitle = document.createElement('h2');
  currentWeatherTitle.textContent = 'Current Weather';
  currentWeatherContainer.append(currentWeatherTitle);

  const currentWeatherTemperature = document.createElement('h3');
  currentWeatherTemperature.textContent = `Temp: ${forecastData[0].main.temp} °C`;
  currentWeatherContainer.append(currentWeatherTemperature);

  const currentWeatherHumidity = document.createElement('h3');
  currentWeatherHumidity.textContent = `Humidity: ${forecastData[0].main.humidity} %`;
  currentWeatherContainer.append(currentWeatherHumidity);

  const currentWeatherWindSpeed = document.createElement('h3');
  currentWeatherWindSpeed.textContent = `Wind Speed: ${forecastData[0].wind.speed} m/s`;
  currentWeatherContainer.append(currentWeatherWindSpeed);

  const currentWeatherInfo = forecastData[0].weather[0];
  if (currentWeatherInfo && currentWeatherInfo.icon) {
    const iconUrl = `https://openweathermap.org/img/wn/${currentWeatherInfo.icon}.png`;
    const iconInfo = document.createElement('h3');
    iconInfo.textContent = currentWeatherInfo.description;
    const icon = document.createElement('img');
    icon.src = iconUrl;
    currentWeatherContainer.append(icon);
    currentWeatherContainer.append(iconInfo);
  }

  searchResultDiv.append(currentWeatherContainer);

  // Skapa element för prognoser
  for (let i = 3; i <= forecastInterval; i += 3) {
    const forecastItem = forecastData[(i / 3) - 1];
    const forecastItemTime = new Date(forecastItem.dt * 1000);

    const forecastItemContainer = document.createElement('div');
    forecastItemContainer.classList.add('forecast-item');

    const forecastItemTimeElement = document.createElement('h2');
    forecastItemTimeElement.textContent = forecastItemTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    forecastItemContainer.append(forecastItemTimeElement);

    const forecastItemTemperature = document.createElement('h3');
    forecastItemTemperature.textContent = `Temp: ${forecastItem.main.temp} °C`;
    forecastItemContainer.append(forecastItemTemperature);

    const forecastItemHumidity = document.createElement('h3');
    forecastItemHumidity.textContent = `Humidity: ${forecastItem.main.humidity} %`;
    forecastItemContainer.append(forecastItemHumidity);

    const forecastItemWindSpeed = document.createElement('h3');
    forecastItemWindSpeed.textContent = `Wind Speed: ${forecastItem.wind.speed} m/s`;
    forecastItemContainer.append(forecastItemWindSpeed);

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














// ändra så att forecasten först visar hur vädret ser ut just nu, sedan utgår ifrån intervallerna 3 timmar framåt beronde på vald intervall. upp til 12 timmar. eventuellt ha vädret just nu under search weather och sen se timmar framåt.  






// const form = document.querySelector('#weatherForm');
// const searchResultDiv = document.querySelector('#result-container');
// const errorH3 = document.querySelector('#error');
// const increaseButton = document.querySelector('#increase-button');
// const decreaseButton = document.querySelector('#decrease-button');
// const intervalInput = document.querySelector('#interval-input');
// intervalInput.setAttribute('max', '12');

// form.addEventListener('submit', fetchWeather);
// increaseButton.addEventListener('click', increaseInterval);
// decreaseButton.addEventListener('click', decreaseInterval);
// intervalInput.addEventListener('change', updateInterval);

// let forecastInterval = 12; // Standardintervall på 12 timmar
// const minForecastInterval = 3; // Minsta intervall på 3 timmar
// let city = '';

// function showWeather(weather) {
//   console.log(weather);

//   searchResultDiv.innerHTML = '';

//   const cityNameElement = document.getElementById('city-name');
//   cityNameElement.textContent = weather.city.name;

//   const forecastData = weather.list;

//   for (let i = 0; i < forecastInterval; i += 3) {
//     const forecastItem = forecastData[i / 3];
//     const forecastItemTime = new Date(forecastItem.dt * 1000);
//     const forecastItemHour = forecastItemTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true
//     });
//     const forecastItemTemperature = forecastItem.main.temp;
//     const forecastItemHumidity = forecastItem.main.humidity;
//     const forecastItemWindSpeed = forecastItem.wind.speed;

//     const forecastItemContainer = document.createElement('div');
//     forecastItemContainer.classList.add('forecast-item');

//     const forecastItemTimeElement = document.createElement('h3');
//     forecastItemTimeElement.textContent = forecastItemHour;
//     forecastItemContainer.append(forecastItemTimeElement);

//     const temperatureElement = document.createElement('p');
//     temperatureElement.textContent = `Temp: ${forecastItemTemperature} °C`;
//     forecastItemContainer.append(temperatureElement);

//     const humidityElement = document.createElement('p');
//     humidityElement.textContent = `Humidity: ${forecastItemHumidity} %`;
//     forecastItemContainer.append(humidityElement);

//     const windSpeedElement = document.createElement('p');
//     windSpeedElement.textContent = `Wind Speed: ${forecastItemWindSpeed} m/s`;
//     forecastItemContainer.append(windSpeedElement);

//     const weatherInfo = forecastItem.weather[0];
//     if (weatherInfo && weatherInfo.icon) {
//       const iconUrl = `https://openweathermap.org/img/wn/${weatherInfo.icon}.png`;
//       const iconInfo = document.createElement('h3');
//       iconInfo.textContent = weatherInfo.description;
//       const icon = document.createElement('img');
//       icon.src = iconUrl;
//       forecastItemContainer.append(icon);
//       forecastItemContainer.append(iconInfo);
//     }

//     searchResultDiv.append(forecastItemContainer);
//   }

//   searchResultDiv.style.display = 'flex';
// }

// function showErrorMessage(message) {
//   errorH3.textContent = message;
//   searchResultDiv.style.display = 'none';
// }

// function fetchWeather(event) {
//   event.preventDefault();
//   searchResultDiv.innerHTML = '';
//   errorH3.textContent = '';
//   city = event.target.elements[0].value;
//   const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`;

//   fetch(weatherUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('City not found');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       showWeather(data);
//     })
//     .catch((error) => {
//       console.log(error);
//       showErrorMessage('City not found');
//     });
// }

// function increaseInterval() {
//   forecastInterval += 3;
//   updateIntervalInput();
//   fetchWeatherByCity(city);
// }

// function decreaseInterval() {
//   if (forecastInterval - 3 >= minForecastInterval) {
//     forecastInterval -= 3;
//     updateIntervalInput();
//     fetchWeatherByCity(city);
//   }
// }

// function updateInterval() {
//   const newForecastInterval = parseInt(intervalInput.value);
//   if (newForecastInterval >= minForecastInterval) {
//     forecastInterval = newForecastInterval;
//     fetchWeatherByCity(city);
//   }
// }

// function updateIntervalInput() {
//   intervalInput.value = forecastInterval.toString();
// }

// function fetchWeatherByCity(city) {
//   const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`;

//   fetch(weatherUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('City not found');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       showWeather(data);
//     })
//     .catch((error) => {
//       console.log(error);
//       showErrorMessage('City not found');
//     });
// }













