import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Compass,
  MapPin,
  Calendar,
  AlertTriangle,
  TrendingUp,
  History,
} from "lucide-react";
import "./WeatherPage.css";

const WeatherPage = () => {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const API_KEY = "7f8136ee6d1c6f0619bc5a99dd614eb5";
  const BACKEND_URL = "http://localhost:5001/api/weather";

  
  const getUserId = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return null;
  };

  // Fetch weather history on component mount
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      fetchWeatherHistory(userId);
    }
  }, []);

  const fetchWeatherHistory = async (userId) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/history/${userId}`);
      if (res.data.success) {
        setWeatherHistory(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching weather history:", err);
    }
  };

  const saveWeatherToMongoDB = async (weatherData, forecastData) => {
    try {
      const userId = getUserId();
      
      const res = await axios.post(`${BACKEND_URL}/save`, {
        userId,
        city,
        weatherData,
        forecastData,
      });

      if (res.data.success) {
        console.log("✅ Weather data saved to MongoDB");
        // Refresh history if user is logged in
        if (userId) {
          fetchWeatherHistory(userId);
        }
      }
    } catch (err) {
      console.error("❌ Error saving weather data:", err);
    }
  };

  const getWeather = async () => {
    try {
      setError("");
      // Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherRes.json();
      if (weatherData.cod !== 200) throw new Error(weatherData.message);

      // Forecast (5-day)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const currentWeather = {
        location: `${weatherData.name}, ${weatherData.sys.country}`,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        visibility: weatherData.visibility / 1000,
        pressure: weatherData.main.pressure,
        feelsLike: weatherData.main.feels_like,
      };

      setWeather(currentWeather);

      // Extract 5-day forecast (1 per day)
      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      const formattedForecast = dailyForecast.map((day) => ({
        date: new Date(day.dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        high: day.main.temp_max,
        low: day.main.temp_min,
        condition: day.weather[0].description,
        rain: day.pop * 100,
      }));

      setForecast(formattedForecast);

      // Save to MongoDB
      await saveWeatherToMongoDB(currentWeather, formattedForecast);

    } catch (err) {
      setError("City not found. Please try again.");
      console.error(err);
    }
  };

  const getWeatherIcon = (condition) => {
    condition = condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="weather-icon" />;
    if (condition.includes("cloud")) return <Cloud className="weather-icon" />;
    if (condition.includes("sun") || condition.includes("clear"))
      return <Sun className="weather-icon" />;
    return <Cloud className="weather-icon" />;
  };

  return (
    <div className="weather-container">
      <div className="weather-wrapper">
        <div className="weather-header">
          <h1 className="weather-title">
            <Cloud className="weather-header-icon" /> Weather Insights
          </h1>
          <p className="weather-description">
            Get real-time weather data and forecasts for your farm
          </p>
        </div>

        {/* Input Field */}
        <div className="city-input-section">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="city-input"
          />
          <button onClick={getWeather} className="fetch-button">
            Fetch Weather
          </button>
          {weatherHistory.length > 0 && (
            <button 
              onClick={() => setShowHistory(!showHistory)} 
              className="history-button"
            >
              <History size={18} />
              {showHistory ? 'Hide' : 'Show'} History
            </button>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        {/* Weather History */}
        {showHistory && weatherHistory.length > 0 && (
          <div className="history-section">
            <h3 className="history-title">
              <History className="history-icon" /> Recent Searches
            </h3>
            <div className="history-list">
              {weatherHistory.map((record, index) => (
                <div key={index} className="history-item">
                  <div className="history-info">
                    <p className="history-location">{record.location}</p>
                    <p className="history-temp">{Math.round(record.temperature)}°C</p>
                  </div>
                  <p className="history-date">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {weather && (
          <div className="weather-grid">
            {/* Current Weather */}
            <div className="current-weather-section">
              <div className="current-weather-card">
                <div className="current-weather-header">
                  <div>
                    <div className="location-info">
                      <MapPin className="location-icon" />
                      <span className="location-text">{weather.location}</span>
                    </div>
                    <h2 className="temperature-main">
                      {Math.round(weather.temperature)}°C
                    </h2>
                    <p className="condition-main">
                      {weather.condition.charAt(0).toUpperCase() +
                        weather.condition.slice(1)}
                    </p>
                    <p className="feels-like">
                      Feels like {Math.round(weather.feelsLike)}°C
                    </p>
                  </div>
                  <div className="weather-display">
                    {getWeatherIcon(weather.condition)}
                    <p className="date-display">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="weather-metrics">
                  <div className="metric-card">
                    <Droplets className="metric-icon" />
                    <p className="metric-label">Humidity</p>
                    <p className="metric-value">{weather.humidity}%</p>
                  </div>
                  <div className="metric-card">
                    <Wind className="metric-icon" />
                    <p className="metric-label">Wind Speed</p>
                    <p className="metric-value">{weather.windSpeed} km/h</p>
                  </div>
                  <div className="metric-card">
                    <Eye className="metric-icon" />
                    <p className="metric-label">Visibility</p>
                    <p className="metric-value">{weather.visibility} km</p>
                  </div>
                  <div className="metric-card">
                    <Compass className="metric-icon" />
                    <p className="metric-label">Pressure</p>
                    <p className="metric-value">{weather.pressure} mb</p>
                  </div>
                </div>
              </div>

              {/* Forecast */}
              <div className="forecast-card">
                <h3 className="forecast-title">
                  <Calendar className="forecast-icon" /> 5-Day Forecast
                </h3>
                <div className="forecast-list">
                  {forecast.map((day, index) => (
                    <div key={index} className="forecast-item">
                      <div className="forecast-left">
                        <p className="day-name">{day.date}</p>
                        <div className="forecast-condition">
                          {getWeatherIcon(day.condition)}
                          <span className="condition-text">
                            {day.condition.charAt(0).toUpperCase() +
                              day.condition.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="forecast-right">
                        <div className="rain-chance">
                          <CloudRain className="rain-icon" />
                          <span className="rain-percentage">
                            {Math.round(day.rain)}%
                          </span>
                        </div>
                        <div className="temperature-range">
                          <span className="temp-high">
                            {Math.round(day.high)}°
                          </span>
                          <span className="temp-low">
                            {Math.round(day.low)}°
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="weather-sidebar">
              <div className="alerts-card">
                <h3 className="alerts-title">
                  <AlertTriangle className="alerts-icon" /> Weather Alerts
                </h3>
                <div className="alert-item alert-info">
                  <TrendingUp className="alert-icon alert-icon-blue" />
                  <div>
                    <h4 className="alert-title">Check Forecast</h4>
                    <p className="alert-message">
                      Stay updated with the latest weather changes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="location-card">
                <h3 className="location-title">Location Settings</h3>
                <p className="location-description">
                  Update your location to get accurate forecasts for your farm.
                </p>
                <button className="location-button" onClick={getWeather}>
                  <MapPin className="location-button-icon" />
                  <span>Update Location</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;