// Load weather info from Open Weather Map
const getCityWeather = async (cityName) => {
  const apiKey = '382f59524073c13ea2c6dfb8347a2258';
  const unit = 'metric';
  const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`)
    .then(response => response.json())
    .then(data => data);
  return result;
};

const setWeather = (weather) => {
  // Select DOM elements
  const weatherLocation = document.querySelector('.weather-location');
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherTemp = document.querySelector('.weather-temp');
  const weatherFeelsLike = document.querySelector('.weather-feels-like');

  // Prepare image source
  const weatherIconUrl = 'https://openweathermap.org/img/wn/';
  const weatherIconExt = '.png';
  const weatherIconType = weather.weather[0].icon;
  const weatherIconURL = `${weatherIconUrl}${weatherIconType}@2x${weatherIconExt}`;

  // Set DOM elements
  weatherLocation.innerHTML = `${weather.name}`;
  weatherIcon.src = `${weatherIconURL}`;
  weatherTemp.innerHTML = `${roundTemp(weather.main.temp)}&deg;`;
  weatherFeelsLike.innerHTML = `Feels like ${roundTemp(weather.main.feels_like)}&deg;`;
};

// Util function for rounding temperature
const roundTemp = (temp) => {
  return Math.round(temp);
};

// Update loading spinner state
const setLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.querySelector('.loading-spinner-wrapper');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
};

// Add event submit event to search form
const searchFormEventListener = () => {
  // Select DOM elements
  const searchForm = document.querySelector('.weather-search-form');
  // Add event listener
  searchForm.addEventListener('submit', async (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Set loading spinner to true
    setLoadingSpinner(true);
    // Get city name from search input
    const searchInput = document.querySelector('.weather-search-input');
    try {
      // Request weather info from Open Weather Map
      const cityWeather = await getCityWeather(searchInput.value);
      // Set weather info to DOM elements
      setWeather(cityWeather);
    } catch (error) {
      // Shows popup if city name is invalid
      alert('City not found');
    } finally {
      // Set loading spinner to false
      setLoadingSpinner(false);
    }
  });
};

// Main function
const main = async () => {
  searchFormEventListener();
  setWeather(await getCityWeather('Vancouver'));
  setLoadingSpinner(false);
}

// Call main function
main();