const form = document.querySelector('#weatherForm');
const searchResultDiv = document.querySelector('#result-container');
const errorH3 = document.querySelector('#error');

form.addEventListener("submit", fetchWeather);

function showWeather(weather) {
    console.log(weather);
    const city = document.createElement('h2');
    city.textContent = weather.name; 
    searchResultDiv.append(city);

    const temp = document.createElement('h3');
    temp.textContent = "Temp: " + weather.main.temp + " °C";
    searchResultDiv.append(temp);

    const humidity = document.createElement('h3');
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    searchResultDiv.append(humidity);

    const wind = document.createElement('h3');
    wind.textContent = "Wind: " + weather.wind.speed + " mph, " + weather.wind.deg + "°";
    searchResultDiv.append(wind);
}

    function showErrorMessage(message) {
    errorH3.textContent = message;
}

function fetchWeather(event) {
    event.preventDefault();
    searchResultDiv.innerHTML = ''; 
    errorH3.textContent = '';
    const city = event.target.elements[0].value;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`;
   
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





    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //     const form = document.querySelector('#weatherForm');
    //     const searchResultDiv = document.querySelector('#result-container');
    //     const errorH3 = document.querySelector('#error');


    //     function showWheather(weather){
    //         console.log(weather);
    //         const city = document.createElement('h2');
    //         city.textContent = weather.name; 
    //         resultContainer.append(city);

    //         const temp = document.createElement('h3');
    //         temp.textContent = ("Temp:" + weather.main.temp + " °C");
    //         resultContainer.append(temp);

    //         const humidity = document.createElement('h3');
    //         humidity.textContent = ("Humidity:" + weather.main.humidity + " %");
    //         resultContainer.append(humidity);

    //         const wind = document.createElement('h3');
    //         wind.textContent = ("Wind:" + weather.wind.speed + " mph" + weather.wind.deg + "°" );
    //         resultContainer.append(wind);
    //     }
    
       
     

    
    //       function fetchWeather(event){
    //         const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${event}&units=matric&appid=e26f81e1cb4b35fdc36b4b6cd3ea2ca5`
           
    //         fetch(weatherUrl)
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     console.log(data);
    //                    })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 });
    //         }
        
    // fetchWeather('Malmö');
     
     
     
     
     
     
     