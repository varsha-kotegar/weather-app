

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

let isCelsius = true;

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found.");
                return;
            }

           
            document.getElementById("cityName").textContent = data.name;
            document.getElementById("temperature").textContent = `${data.main.temp}°C`;
            document.getElementById("weatherCondition").textContent = `${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

            document.getElementById("weatherDisplay").classList.remove("hidden");

            
            changeBackground(data.main.temp);

            
            document.getElementById("tempToggle").onclick = function() {
                isCelsius = !isCelsius;
                const temp = isCelsius ? data.main.temp : (data.main.temp * 9/5) + 32;
                document.getElementById("temperature").textContent = `${temp.toFixed(1)}°${isCelsius ? "C" : "F"}`;
            };
        })
        .catch(error => console.error("Error fetching weather data:", error));
}


function changeBackground(temp) {
    let gradient;
    if (temp < 10) {
        gradient = "linear-gradient(to right, #00c6ff, #0072ff)"; // Cold (Blue) - so that 
    } else if (temp >= 10 && temp <= 25) {
        gradient = "linear-gradient(to right, #ffcc33, #ff9966)"; // Mild (Yellow-Orange)
    } else {
        gradient = "linear-gradient(to right, #ff512f, #dd2476)"; // Hot (Red-Pink)
    }
    document.body.style.background = gradient;
}
