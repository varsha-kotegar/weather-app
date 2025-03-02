const apiKey = "13a860c100cdafd6a26b56ee7619d044"; // OpenWeather API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

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
        
        // Change background and animate icon
        changeBackground(temperature);
        document.getElementById("weather-icon").style.transform = "scale(1.2)";
        setTimeout(() => {
            document.getElementById("weather-icon").style.transform = "scale(1)";
        }, 500);
    } catch (error) {
        alert("City not found. Please try again!");
    }
}

// Function to change background color dynamically
function changeBackground(temperature) {
    let body = document.body;

    if (temperature >= 30) {
        body.style.background = "linear-gradient(to bottom, #ff9800, #ff5722)"; // Hot (Orange-Red)
    } else if (temperature >= 20) {
        body.style.background = "linear-gradient(to bottom, #fbc02d, #ffeb3b)"; // Warm (Yellow)
    } else if (temperature >= 10) {
        body.style.background = "linear-gradient(to bottom, #4fc3f7, #2196f3)"; // Cool (Blue)
    } else {
        body.style.background = "linear-gradient(to bottom, #37474f, #263238)"; // Cold (Dark Blue)
    }
}

// Function to handle search when pressing Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        
        let city = document.getElementById("city-input").value;
        fetchWeather(city);
    }
}

// Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    let toggleIcon = document.getElementById("dark-mode-toggle");
    toggleIcon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Load default weather for Adyar on page load
fetchWeather("Adyar");
