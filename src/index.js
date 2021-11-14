const getCityWeather = async (cityName) => {
  const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=382f59524073c13ea2c6dfb8347a2258&units=metric`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
  return result;
};

const setWeather = (weather) => {
  const weatherLocation = document.querySelector('.weather-location');
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherTemp = document.querySelector('.weather-temp');
  const weatherFeelsLike = document.querySelector('.weather-feels-like');

  const weatherIconUrl = 'https://openweathermap.org/img/wn/';
  const weatherIconExt = '.png';
  const weatherIconType = weather.weather[0].icon;
  const weatherIconURL = `${weatherIconUrl}${weatherIconType}@2x${weatherIconExt}`;

  weatherLocation.innerHTML = `${weather.name}`;
  weatherIcon.src = `${weatherIconURL}`;
  weatherTemp.innerHTML = `${roundTemp(weather.main.temp)}&deg;`;
  weatherFeelsLike.innerHTML = `Feels like ${roundTemp(weather.main.feels_like)}&deg;`;
};

const roundTemp = (temp) => {
  return Math.round(temp);
};

const main = async () => {
  setWeather(await getCityWeather('Vancouver'));
}

// Add event to search form submit event
const searchForm = document.querySelector('.weather-search-form');
searchForm.addEventListener('submit', async (e) => {
  // stop form submission
  e.preventDefault();
  // Read the value of the input
  const searchInput = document.querySelector('.weather-search-input');
  setWeather(await getCityWeather(searchInput.value));
});

main();