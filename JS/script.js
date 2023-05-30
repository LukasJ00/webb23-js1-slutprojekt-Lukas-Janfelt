// Hämta referenser till HTML-element
const form = document.querySelector('#weatherForm');
const searchResultDiv = document.querySelector('#result-container');
const errorH3 = document.querySelector('#error');
const increaseButton = document.querySelector('#increase-button');
const decreaseButton = document.querySelector('#decrease-button');
const intervalInput = document.querySelector('#interval-input');
intervalInput.setAttribute('max', '12');
const cityNameElement = document.getElementById('city-name');

// Lägg till händelselyssnare för formuläret och knapparna
form.addEventListener('submit', fetchWeather);
increaseButton.addEventListener('click', increaseInterval);
decreaseButton.addEventListener('click', decreaseInterval);
intervalInput.addEventListener('change', updateInterval);

// Variabler för väderintervallet och stad
let forecastInterval = 12; // Standardintervall på 12 timmar
const minForecastInterval = 3; // Minsta intervall på 3 timmar
let city = '';

// Funktion för att visa väderinformation
function showWeather(weather) {
  // Rensa tidigare resultat och felmeddelanden
  searchResultDiv.innerHTML = '';
  errorH3.textContent = '';

  // Visa stadens namn
  cityNameElement.textContent = weather.city.name;

  // Skapa element för nuvarande väder
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('forecast-item');

  // Skapa element för nuvarande väderbeskrivning
  const currentWeatherTitle = document.createElement('h3');
  currentWeatherTitle.textContent = 'Current Weather';
  currentWeatherContainer.append(currentWeatherTitle);

  // Skapa element för temperatur, luftfuktighet och vindhastighet
  const currentWeatherTemperature = document.createElement('p');
  currentWeatherTemperature.textContent = `Temp: ${weather.list[0].main.temp} °C`;
  currentWeatherContainer.append(currentWeatherTemperature);

  const currentWeatherHumidity = document.createElement('p');
  currentWeatherHumidity.textContent = `Humidity: ${weather.list[0].main.humidity} %`;
  currentWeatherContainer.append(currentWeatherHumidity);

  const currentWeatherWindSpeed = document.createElement('p');
  currentWeatherWindSpeed.textContent = `Wind Speed: ${weather.list[0].wind.speed} m/s`;
  currentWeatherContainer.append(currentWeatherWindSpeed);

  // Visa ikon och beskrivning för nuvarande väder
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

  // Lägg till nuvarande väder i resultatet
  searchResultDiv.append(currentWeatherContainer);

  // Skapa väderprognos för varje intervall
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

    // Lägg till väderprognos i resultatet
    searchResultDiv.append(forecastItemContainer);
  }

  // Visa resultatet
  searchResultDiv.style.display = 'flex';
}

// Funktion för att visa felmeddelande
function showErrorMessage(message) {
  // Rensa tidigare resultat och felmeddelanden
  searchResultDiv.innerHTML = '';
  errorH3.textContent = message;
  searchResultDiv.style.display = 'none';
}

// Funktion för att hämta väderdata
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

// Funktion för att öka väderintervallet
function increaseInterval() {
  forecastInterval += 3;
  updateIntervalInput();
  fetchWeatherByCity(city);
}

// Funktion för att minska väderintervallet
function decreaseInterval() {
  if (forecastInterval - 3 >= minForecastInterval) {
    forecastInterval -= 3;
    updateIntervalInput();
    fetchWeatherByCity(city);
  }
}

// Funktion för att uppdatera väderintervallet
function updateInterval() {
  const newForecastInterval = parseInt(intervalInput.value);
  if (newForecastInterval >= minForecastInterval) {
    forecastInterval = newForecastInterval;
    fetchWeatherByCity(city);
  }
}

// Funktion för att uppdatera väderintervallets inputfält
function updateIntervalInput() {
  intervalInput.value = forecastInterval.toString();
}

// Funktion för att hämta väderdata med en specifik stad
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
// mall 
// function fetchWeather(query){
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=London&units=matric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`
// fetch(url)
// .then((response) => response.json())
// .then((data) => console.log(data));
// }

// fetchWeather();



// // Hämta referenser till HTML-element
// const form = document.querySelector('#weatherForm');
// const searchResultDiv = document.querySelector('#result-container');
// const errorH3 = document.querySelector('#error');
// const increaseButton = document.querySelector('#increase-button');
// const decreaseButton = document.querySelector('#decrease-button');
// const intervalInput = document.querySelector('#interval-input');
// intervalInput.setAttribute('max', '12');
// const cityNameElement = document.getElementById('city-name');

// // Lägg till händelselyssnare för formuläret och knapparna
// form.addEventListener('submit', fetchWeather);
// increaseButton.addEventListener('click', increaseInterval);
// decreaseButton.addEventListener('click', decreaseInterval);
// intervalInput.addEventListener('change', updateInterval);

// // Variabler för väderintervallet och stad
// let forecastInterval = 12; // Standardintervall på 12 timmar
// const minForecastInterval = 3; // Minsta intervall på 3 timmar
// let city = '';

// // Funktion för att visa väderinformation
// function showWeather(weather) {
//   // Rensa tidigare resultat och felmeddelanden
//   searchResultDiv.innerHTML = '';
//   errorH3.textContent = '';

//   // Visa stadens namn
//   cityNameElement.textContent = weather.city.name;

//   // Skapa element för nuvarande väder
//   const currentWeatherContainer = document.createElement('div');
//   currentWeatherContainer.classList.add('forecast-item');

//   // Skapa element för nuvarande väderbeskrivning
//   const currentWeatherTitle = document.createElement('h3');
//   currentWeatherTitle.textContent = 'Current Weather';
//   currentWeatherContainer.append(currentWeatherTitle);

//   // Skapa element för temperatur, luftfuktighet och vindhastighet
//   const currentWeatherTemperature = document.createElement('p');
//   currentWeatherTemperature.textContent = `Temp: ${weather.list[0].main.temp} °C`;
//   currentWeatherContainer.append(currentWeatherTemperature);

//   const currentWeatherHumidity = document.createElement('p');
//   currentWeatherHumidity.textContent = `Humidity: ${weather.list[0].main.humidity} %`;
//   currentWeatherContainer.append(currentWeatherHumidity);

//   const currentWeatherWindSpeed = document.createElement('p');
//   currentWeatherWindSpeed.textContent = `Wind Speed: ${weather.list[0].wind.speed} m/s`;
//   currentWeatherContainer.append(currentWeatherWindSpeed);

//   // Visa ikon och beskrivning för nuvarande väder
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

//   // Lägg till nuvarande väder i resultatet
//   searchResultDiv.append(currentWeatherContainer);

//   // Skapa väderprognos för varje intervall
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

//     // Lägg till väderprognos i resultatet
//     searchResultDiv.append(forecastItemContainer);
//   }

//   // Visa resultatet
//   searchResultDiv.style.display = 'flex';
// }

// // Funktion för att visa felmeddelande
// function showErrorMessage(message) {
//   // Rensa tidigare resultat och felmeddelanden
//   searchResultDiv.innerHTML = '';
//   errorH3.textContent = message;
//   searchResultDiv.style.display = 'none';
// }

// // Funktion för att hämta väderdata
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

// // Funktion för att öka väderintervallet
// function increaseInterval() {
//   forecastInterval += 3;
//   updateIntervalInput();
//   fetchWeatherByCity(city);
// }

// // Funktion för att minska väderintervallet
// function decreaseInterval() {
//   if (forecastInterval - 3 >= minForecastInterval) {
//     forecastInterval -= 3;
//     updateIntervalInput();
//     fetchWeatherByCity(city);
//   }
// }

// // Funktion för att uppdatera väderintervallet
// function updateInterval() {
//   const newForecastInterval = parseInt(intervalInput.value);
//   if (newForecastInterval >= minForecastInterval) {
//     forecastInterval = newForecastInterval;
//     fetchWeatherByCity(city);
//   }
// }

// // Funktion för att uppdatera väderintervallets inputfält
// function updateIntervalInput() {
//   intervalInput.value = forecastInterval.toString();
// }

// // Funktion för att hämta väderdata med en specifik stad
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
