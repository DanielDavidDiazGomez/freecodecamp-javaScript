async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
 
async function showWeather(city) {
  const data = await getWeather(city);
 
  if (!data) {
    alert('Something went wrong, please try again later.');
    return;
  }
 
  const weather = data.weather && data.weather[0];
 
  const fields = {
    location: data.name,
    'weather-main': weather && weather.main,
    'main-temperature': data.main && data.main.temp,
    'feels-like': data.main && data.main.feels_like,
    humidity: data.main && data.main.humidity,
    wind: data.wind && data.wind.speed,
    'wind-gust': data.wind && data.wind.gust,
  };
 
  Object.keys(fields).forEach((id) => {
    const value = fields[id];
    document.getElementById(id).textContent = value === undefined ? 'N/A' : value;
  });
 
  const iconEl = document.getElementById('weather-icon');
  if (weather && weather.icon) {
    iconEl.src = weather.icon;
    iconEl.alt = weather.description || weather.main || 'weather icon';
  } else {
    iconEl.src = '';
    iconEl.alt = '';
  }
}
 
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('city-select');
  const button = document.getElementById('get-weather-btn');
 
  button.addEventListener('click', () => {
    const city = select.value;
    if (!city) return;
    showWeather(city);
  });
});
