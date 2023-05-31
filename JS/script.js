// Referenser till HTML-element
const form = document.querySelector('#weatherForm');
const searchResultDiv = document.querySelector('#result-container');
const errorH3 = document.querySelector('#error');
const increaseButton = document.querySelector('#increase-button');
const decreaseButton = document.querySelector('#decrease-button');
const intervalInput = document.querySelector('#interval-input');
intervalInput.setAttribute('max', '12');
intervalInput.value = '3';
const cityNameElement = document.getElementById('city-name');
const body = document.querySelector('body');

// Händelselyssnare för formuläret och knapparna
form.addEventListener('submit', fetchWeather);
increaseButton.addEventListener('click', increaseIntervalHandler);
decreaseButton.addEventListener('click', decreaseIntervalHandler);
intervalInput.addEventListener('change', updateIntervalInput);

// Variabler för väderintervallet och stad
let forecastInterval = 3; 
const minForecastInterval = 3; 


// Visa väderinformation
function showWeather(weather) {
  // Rensa tidigare resultat och felmeddelanden
  searchResultDiv.innerHTML = '';
  errorH3.textContent = '';

  // Stadens namn
  cityNameElement.textContent = weather.city.name;

  // Element för nuvarande väder
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('forecast-item');

  // Element för nuvarande väderbeskrivning
  const currentWeatherTitle = document.createElement('h3');
  currentWeatherTitle.textContent = 'Current Weather';
  currentWeatherContainer.append(currentWeatherTitle);

  // Element för temperatur, luftfuktighet och vindhastighet
  const currentWeatherTemperature = document.createElement('p');
  currentWeatherTemperature.textContent = `Temp: ${weather.list[0].main.temp} °C`;
  currentWeatherContainer.append(currentWeatherTemperature);

  const currentWeatherHumidity = document.createElement('p');
  currentWeatherHumidity.textContent = `Humidity: ${weather.list[0].main.humidity} %`;
  currentWeatherContainer.append(currentWeatherHumidity);

  const currentWeatherWindSpeed = document.createElement('p');
  currentWeatherWindSpeed.textContent = `Wind Speed: ${weather.list[0].wind.speed} m/s`;
  currentWeatherContainer.append(currentWeatherWindSpeed);

  // Ikon och beskrivning för nuvarande väder
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

  // Nuvarande väder i resultatet
  searchResultDiv.append(currentWeatherContainer);

  // Väderprognos för varje intervall
  const forecastItems = weather.list.slice(1, forecastInterval/3 +1);
  console.log(weather.list, forecastInterval );
  for (let i = 0; i < forecastItems.length; i++) {
    const forecastItem = forecastItems[i];
    const forecastItemTime = new Date(forecastItem.dt_txt);

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


// Ändra bakgrundsfärg baserat på temperaturen
const currentTemperature = weather.list[0].main.temp;
if (currentTemperature > 15) {
  searchResultDiv.style.backgroundColor = '#F5EC6F';
} else {
  searchResultDiv.style.backgroundColor = '#87ceeb';
}
}

// Visa felmeddelande
function showErrorMessage(message) {
  searchResultDiv.innerHTML = '';
  errorH3.textContent = message;
  searchResultDiv.style.display = 'none';
}

// Hämta väderdata
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
      let errorMessage = 'An error occurred while fetching weather data. Please check your internet connection';
      if (error.message === 'City not found') {
        errorMessage = 'City not found.';
      }
      showErrorMessage(errorMessage);
      searchResultDiv.innerHTML = '';
      cityNameElement.textContent = '';
    });
}

// Öka väderintervallet
function increaseIntervalHandler() {
  if (forecastInterval + 3 <= 12) {
    forecastInterval += 3;
    updateIntervalInput();
    fetchWeatherByCity(city);
  }
}

// Minska väderintervallet
function decreaseIntervalHandler() {
  if (forecastInterval - 3 >= minForecastInterval) {
    forecastInterval -= 3;
    updateIntervalInput();
    fetchWeatherByCity(city);
  }
}

// Uppdatera väderintervallet
function updateIntervalInput() {
  const newForecastInterval = parseInt(intervalInput.value);
  if (newForecastInterval >= minForecastInterval) {
    forecastInterval = newForecastInterval;
    fetchWeatherByCity(city);
  }
}

// Uppdatera väderintervallets inputfält
function updateIntervalInput() {
  intervalInput.value = forecastInterval.toString();
}

//Hämtar väderdata med en specifik stad
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