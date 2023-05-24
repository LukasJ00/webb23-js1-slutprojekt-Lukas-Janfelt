const form = document.querySelector('form');
const searchResultDiv = document.querySelector('#container')
const errorH3 = document.querySelector('#error');



form.addEventListener("submit", searchCityWeather);

function searchCityWeather(event){
    event.preventDefault();
    const apiKey = "e26f81e1cb4b35fdc36b4b6cd3ea2ca5";
    const cityInput = document.querySelector('input[type="text"]');
    const city = cityInput.value;
    const wheatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    

    fetch(wheatherUrl)
    .then((response)=> response.json())
    .then((data) => console.log(data));
  
}

searchCityWeather();

























// const form = document.querySelector('form');
// const searchResultDiv = document.querySelector('#container');
// const errorH3 = document.querySelector('#error');

// form.addEventListener('submit', function(event){
//     event.preventDefault();
//     searchResultDiv.innerHTML = '';
//     errorH3.innerText = '';

//     const input = document.querySelector('input');
//     const language = input.value;
//     form.reset();

    

//     const countryUrl = 'https://restcountries.com/v3.1/lang/' + language;
//     // console.log(countryUrl);


//     fetch(countryUrl)
//         .then( response=>{
//             // console.log(response);
//             if(response.ok){
//                 return response.json();
//             }
//             else{
//                 throw 'Something went wrong';
//             }
//         })
//         .then( displayCountries )
//         .catch( handleError );
// })

// function displayCountries(countries){
//     // console.log(countries[0].name.common);

//     countries.forEach(country => {
//         console.log(country.name.common);
//         const p = document.createElement('p');
//         p.innerText = country.name.common;
//         searchResultDiv.append(p);
//     });
// }

// function handleError(error){
//     // console.log(error);
//     errorH3.innerText = error;
// }