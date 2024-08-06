// Weather APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "c9f9b5aa32df01922235550601ab9170";

weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value;
    if (!city) {
        displayError("Please enter a city");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Change units to metric for Celsius

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            displayError("City not found");
            return;
        }

        displayWeather(data);
    } catch (error) {
        displayError("Unable to retrieve weather data");
    }
});

function displayWeather(data) {
    const cityDisplay = document.createElement("h1");
    cityDisplay.className = "cityDisplay";
    cityDisplay.textContent = data.name;

    const tempDisplay = document.createElement("p");
    tempDisplay.className = "tempDisplay";
    tempDisplay.textContent = `${Math.round(data.main.temp)}°C`; // Display temperature in Celsius

    const humidityDisplay = document.createElement("p");
    humidityDisplay.className = "humidityDisplay";
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;

    const descDisplay = document.createElement("p");
    descDisplay.className = "descDisplay";
    descDisplay.textContent = data.weather[0].description;

    const weatherEmoji = document.createElement("p");
    weatherEmoji.className = "weatherEmoji";
    weatherEmoji.textContent = getWeatherEmoji(data.weather[0].main);

    card.innerHTML = ""; // Clear previous content
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

    card.style.display = "flex"; // Show the card
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.className = "errorDisplay";
    errorDisplay.textContent = message;

    card.innerHTML = ""; // Clear previous content
    card.appendChild(errorDisplay);

    card.style.display = "flex"; // Show the card
}

function getWeatherEmoji(weather) {
    const emojis = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Smoke: "🌫️",
        Haze: "🌫️",
        Dust: "🌫️",
        Fog: "🌫️",
        Sand: "🌫️",
        Ash: "🌫️",
        Squall: "🌫️",
        Tornado: "🌪️",
    };

    return emojis[weather] || "🌡️"; // Default emoji if weather condition is not listed
}
