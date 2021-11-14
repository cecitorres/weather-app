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
  weatherTemp.innerHTML = `${weather.main.temp}&deg;`;
  weatherFeelsLike.innerHTML = `Feels like ${weather.main.feels_like}&deg;`;
};

const main = async () => {
  setWeather(await getCityWeather('Vancouver'));
}

main();