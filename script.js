const apiKey = "13a860c100cdafd6a26b56ee7619d044"; // OpenWeather API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast";



// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        
        // Extracting required details
        const temperature = Math.round(data.main.temp);
        const weatherCondition = data.weather[0].main;
        const minTemp = Math.round(data.main.temp_min);
        const maxTemp = Math.round(data.main.temp_max);
        const weatherIcon = data.weather[0].icon;

        // Updating UI
        document.getElementById("city").textContent = data.name + ", " + data.sys.country;
        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("condition").textContent = weatherCondition;
        document.getElementById("minmax").textContent = `${minTemp}°C / ${maxTemp}°C`;
        document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        
        // Change background
        changeBackground(temperature);

        // Fetch hourly forecast
        fetchHourlyForecast(city);
    } catch (error) {
        alert("City not found. Please try again!");
    }
}



// Function to fetch hourly forecast
async function fetchHourlyForecast(city) {
    try {
        const response = await fetch(`${apiForecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("Forecast not available");
        const data = await response.json();
        
        const hourlyData = data.list.slice(0, 5); // Get next 5-hour forecast
        let forecastHTML = "";
        

        
        hourlyData.forEach(hour => {
            const temp = Math.round(hour.main.temp);
            const time = new Date(hour.dt_txt).getHours();
            const icon = hour.weather[0].icon;

            forecastHTML += `
                <div class="hour">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" width="30">
                    <p>${time}:00</p>
                    <p>${temp}°C</p>
                </div>
            `;
        });

        document.getElementById("hourly-forecast").innerHTML = forecastHTML;
    } catch (error) {
        console.error("Error fetching hourly forecast:", error);
    }
}

// Function to change background dynamically
function changeBackground(temperature) {
    let body = document.body;

    if (temperature >= 30) {
        body.style.background = "linear-gradient(to bottom, #ff9800, #ff5722)";
    } else if (temperature >= 20) {
        body.style.background = "linear-gradient(to bottom, #fbc02d, #ffeb3b)";
    } else {
        body.style.background = "linear-gradient(to bottom, #37474f, #263238)";
    }
}

// Event listener for search
function handleKeyPress(event) {
    if (event.key === "Enter") {
        fetchWeather(document.getElementById("city-input").value);
    }
}

// Load default weather
fetchWeather("Adyar");
