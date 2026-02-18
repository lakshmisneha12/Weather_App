const apiKey = '840023f7ca9424f53dedda107c5e6d17'; // Your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if(cityName) {
        getWeather(cityName);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    weatherResult.innerHTML = `
        <h2>${name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Weather:</strong> ${weather[0].main} (${weather[0].description})</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    `;
}
