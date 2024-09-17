document.getElementById('search-btn').addEventListener('click', function() {
    const apiKey = 'c282b6574cff4401bf8125610241709'; 
    const city = document.getElementById('city-input').value;

    if (city) {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayWeather(data);
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
    } else {
        alert('Please enter a city name');
    }
});

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';

    document.getElementById('city-name').innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById('weather-condition').innerText = data.current.condition.text;
    document.getElementById('temperature').innerText = `Temperature: ${data.current.temp_c} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.current.wind_kph} kph`;

    
    document.getElementById('weather-icon').src = `https:${data.current.condition.icon}`;
}