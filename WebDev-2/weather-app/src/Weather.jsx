import { useEffect, useState } from "react";
import "./Weather.css";
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";

const apiKey = import.meta.env.VITE_APP_ID;

const weatherIcons = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": cloudIcon,
  "04n": cloudIcon,
  "09d": drizzleIcon,
  "09n": drizzleIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "11d": rainIcon,
  "11n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
  "50d": cloudIcon,
  "50n": cloudIcon,
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (cityName) => {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    if (!apiKey) {
      setError("Weather API key is missing.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        trimmedCity
      )}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not find weather data.");
      }

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icon: weatherIcons[data.weather[0].icon] || clearIcon,
      });
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(city);
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div className="weather">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit" aria-label="Search weather">
          <img src={searchIcon} alt="" />
        </button>
      </form>

      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="status-message error-message">{error}</p>}

      {!loading && weatherData && (
        <>
          <img
            src={weatherData.icon}
            alt={weatherData.description}
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <p className="description">{weatherData.description}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={windIcon} alt="" />
              <div>
                <p>{weatherData.windSpeed} m/s</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
