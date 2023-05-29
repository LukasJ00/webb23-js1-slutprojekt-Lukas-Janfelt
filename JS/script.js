const form = document.querySelector('#weatherForm');
const searchResultDiv = document.querySelector('#result-container');
const errorH3 = document.querySelector('#error');
const increaseButton = document.querySelector('#increase-button');
const decreaseButton = document.querySelector('#decrease-button');
const intervalInput = document.querySelector('#interval-input');
intervalInput.setAttribute('max', '12');
const cityNameElement = document.getElementById('city-name');

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
  errorH3.textContent = '';

  cityNameElement.textContent = weather.city.name;

  // Skapa element för nuvarande väder
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('forecast-item');

  const currentWeatherTitle = document.createElement('h3');
  currentWeatherTitle.textContent = 'Current Weather';
  currentWeatherContainer.append(currentWeatherTitle);

  const currentWeatherTemperature = document.createElement('p');
  currentWeatherTemperature.textContent = `Temp: ${weather.list[0].main.temp} °C`;
  currentWeatherContainer.append(currentWeatherTemperature);

  const currentWeatherHumidity = document.createElement('p');
  currentWeatherHumidity.textContent = `Humidity: ${weather.list[0].main.humidity} %`;
  currentWeatherContainer.append(currentWeatherHumidity);

  const currentWeatherWindSpeed = document.createElement('p');
  currentWeatherWindSpeed.textContent = `Wind Speed: ${weather.list[0].wind.speed} m/s`;
  currentWeatherContainer.append(currentWeatherWindSpeed);

  const currentWeatherInfo = weather.list[0].weather[0];
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

  
  for (let i = 3; i <= forecastInterval; i += 3) {
    const forecastItem = weather.list[(i / 3) - 1];
    const forecastItemTime = new Date(forecastItem.dt * 1000);

    const forecastItemContainer = document.createElement('div');
    forecastItemContainer.classList.add('forecast-item');

    const forecastItemTimeElement = document.createElement('h3');
    forecastItemTimeElement.textContent = forecastItemTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    forecastItemContainer.append(forecastItemTimeElement);

    const forecastItemTemperature = document.createElement('p');
    forecastItemTemperature.textContent = `Temp: ${forecastItem.main.temp} °C`;
    forecastItemContainer.append(forecastItemTemperature);

    const forecastItemHumidity = document.createElement('p');
    forecastItemHumidity.textContent = `Humidity: ${forecastItem.main.humidity} %`;
    forecastItemContainer.append(forecastItemHumidity);

    const forecastItemWindSpeed = document.createElement('p');
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
  searchResultDiv.innerHTML = '';
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
      searchResultDiv.innerHTML = ''; 
      cityNameElement.textContent = ''; 
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
      searchResultDiv.innerHTML = ''; 
      cityNameElement.textContent = ''; 
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
// const cityNameElement = document.getElementById('city-name');

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
//   errorH3.textContent = '';

//   cityNameElement.textContent = weather.city.name;

//   // Skapa element för nuvarande väder
//   const currentWeatherContainer = document.createElement('div');
//   currentWeatherContainer.classList.add('forecast-item');

//   const currentWeatherTitle = document.createElement('h3');
//   currentWeatherTitle.textContent = 'Current Weather';
//   currentWeatherContainer.append(currentWeatherTitle);

//   const currentWeatherTemperature = document.createElement('p');
//   currentWeatherTemperature.textContent = `Temp: ${weather.list[0].main.temp} °C`;
//   currentWeatherContainer.append(currentWeatherTemperature);

//   const currentWeatherHumidity = document.createElement('p');
//   currentWeatherHumidity.textContent = `Humidity: ${weather.list[0].main.humidity} %`;
//   currentWeatherContainer.append(currentWeatherHumidity);

//   const currentWeatherWindSpeed = document.createElement('p');
//   currentWeatherWindSpeed.textContent = `Wind Speed: ${weather.list[0].wind.speed} m/s`;
//   currentWeatherContainer.append(currentWeatherWindSpeed);

//   const currentWeatherInfo = weather.list[0].weather[0];
//   if (currentWeatherInfo && currentWeatherInfo.icon) {
//     const iconUrl = `https://openweathermap.org/img/wn/${currentWeatherInfo.icon}.png`;
//     const iconInfo = document.createElement('h3');
//     iconInfo.textContent = currentWeatherInfo.description;
//     const icon = document.createElement('img');
//     icon.src = iconUrl;
//     currentWeatherContainer.append(icon);
//     currentWeatherContainer.append(iconInfo);
//   }

//   searchResultDiv.append(currentWeatherContainer);

  
//   for (let i = 3; i <= forecastInterval; i += 3) {
//     const forecastItem = weather.list[(i / 3) - 1];
//     const forecastItemTime = new Date(forecastItem.dt * 1000);

//     const forecastItemContainer = document.createElement('div');
//     forecastItemContainer.classList.add('forecast-item');

//     const forecastItemTimeElement = document.createElement('h3');
//     forecastItemTimeElement.textContent = forecastItemTime.toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true
//     });
//     forecastItemContainer.append(forecastItemTimeElement);

//     const forecastItemTemperature = document.createElement('p');
//     forecastItemTemperature.textContent = `Temp: ${forecastItem.main.temp} °C`;
//     forecastItemContainer.append(forecastItemTemperature);

//     const forecastItemHumidity = document.createElement('p');
//     forecastItemHumidity.textContent = `Humidity: ${forecastItem.main.humidity} %`;
//     forecastItemContainer.append(forecastItemHumidity);

//     const forecastItemWindSpeed = document.createElement('p');
//     forecastItemWindSpeed.textContent = `Wind Speed: ${forecastItem.wind.speed} m/s`;
//     forecastItemContainer.append(forecastItemWindSpeed);

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
//   searchResultDiv.innerHTML = '';
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
//       searchResultDiv.innerHTML = ''; 
//       cityNameElement.textContent = ''; 
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
//       searchResultDiv.innerHTML = ''; 
//       cityNameElement.textContent = ''; 
//     });
// }












