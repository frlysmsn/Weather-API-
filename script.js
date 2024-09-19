const apiKey = '52e677fbdfc9a9c2a9804689b722aea5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const leyteSelect = document.getElementById('leyteSelect');
const weatherForm = document.getElementById('weatherForm');

const mainSection = document.querySelector('main');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const selectedCity = leyteSelect.value;
    if (selectedCity) {
        fetchWeather(selectedCity);
    } else {
        alert('Please select a city from Leyte.');
    }
});

function fetchWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`City not found: ${city}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            mainSection.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });
}

function displayWeather(data) {
    const weatherHTML = `
        <div class="weather-info">
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;

    mainSection.innerHTML = weatherHTML;
}
