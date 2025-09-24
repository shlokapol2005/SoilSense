import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Compass,
  TrendingUp,
  AlertTriangle,
  Calendar,
  MapPin
} from 'lucide-react';
import './WeatherPage.css';

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState({
    location: 'Mumbai, Maharashtra',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 68,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 32
  });

  const [forecast, setForecast] = useState([
    { day: 'Today', high: 32, low: 24, condition: 'Partly Cloudy', icon: 'partly-cloudy', rain: 10 },
    { day: 'Tomorrow', high: 30, low: 22, condition: 'Sunny', icon: 'sunny', rain: 0 },
    { day: 'Wednesday', high: 29, low: 23, condition: 'Cloudy', icon: 'cloudy', rain: 20 },
    { day: 'Thursday', high: 27, low: 21, condition: 'Light Rain', icon: 'rainy', rain: 80 },
    { day: 'Friday', high: 26, low: 20, condition: 'Heavy Rain', icon: 'heavy-rain', rain: 95 },
    { day: 'Saturday', high: 28, low: 22, condition: 'Partly Cloudy', icon: 'partly-cloudy', rain: 30 },
    { day: 'Sunday', high: 31, low: 25, condition: 'Sunny', icon: 'sunny', rain: 5 }
  ]);

  const [alerts, setAlerts] = useState([
    {
      type: 'warning',
      title: 'Heavy Rainfall Expected',
      message: 'Heavy rainfall expected on Thursday-Friday. Consider postponing field activities.',
      time: '2 hours ago'
    },
    {
      type: 'info',
      title: 'Optimal Irrigation Time',
      message: 'Current humidity levels are ideal for irrigation. Best time: 6-8 AM.',
      time: '1 day ago'
    }
  ]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="weather-icon weather-icon-yellow" />;
      case 'partly-cloudy':
        return <Cloud className="weather-icon weather-icon-gray" />;
      case 'cloudy':
        return <Cloud className="weather-icon weather-icon-gray-dark" />;
      case 'rainy':
      case 'heavy-rain':
        return <CloudRain className="weather-icon weather-icon-blue" />;
      default:
        return <Sun className="weather-icon weather-icon-yellow" />;
    }
  };

  const getAlertIcon = (type) => {
    return type === 'warning' ? 
      <AlertTriangle className="alert-icon alert-icon-orange" /> : 
      <TrendingUp className="alert-icon alert-icon-blue" />;
  };

  const getAlertBg = (type) => {
    return type === 'warning' ? 'alert-warning' : 'alert-info';
  };

  return (
    <div className="weather-container">
      <div className="weather-wrapper">
        {/* Header */}
        <div className="weather-header">
          <h1 className="weather-title">
            <Cloud className="weather-header-icon" />
            Weather Insights
          </h1>
          <p className="weather-description">
            Real-time weather data and forecasts to help you make informed farming decisions
          </p>
        </div>

        <div className="weather-grid">
          {/* Current Weather */}
          <div className="current-weather-section">
            <div className="current-weather-card">
              <div className="current-weather-header">
                <div>
                  <div className="location-info">
                    <MapPin className="location-icon" />
                    <span className="location-text">{currentWeather.location}</span>
                  </div>
                  <h2 className="temperature-main">{currentWeather.temperature}°C</h2>
                  <p className="condition-main">{currentWeather.condition}</p>
                  <p className="feels-like">Feels like {currentWeather.feelsLike}°C</p>
                </div>
                <div className="weather-display">
                  <Sun className="main-weather-icon" />
                  <p className="date-display">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="weather-metrics">
                <div className="metric-card">
                  <Droplets className="metric-icon" />
                  <p className="metric-label">Humidity</p>
                  <p className="metric-value">{currentWeather.humidity}%</p>
                </div>
                <div className="metric-card">
                  <Wind className="metric-icon" />
                  <p className="metric-label">Wind Speed</p>
                  <p className="metric-value">{currentWeather.windSpeed} km/h</p>
                </div>
                <div className="metric-card">
                  <Eye className="metric-icon" />
                  <p className="metric-label">Visibility</p>
                  <p className="metric-value">{currentWeather.visibility} km</p>
                </div>
                <div className="metric-card">
                  <Compass className="metric-icon" />
                  <p className="metric-label">Pressure</p>
                  <p className="metric-value">{currentWeather.pressure} mb</p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="forecast-card">
              <h3 className="forecast-title">
                <Calendar className="forecast-icon" />
                7-Day Forecast
              </h3>
              
              <div className="forecast-list">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <div className="forecast-left">
                      <div className="forecast-day">
                        <p className="day-name">{day.day}</p>
                      </div>
                      <div className="forecast-condition">
                        {getWeatherIcon(day.icon)}
                        <span className="condition-text">{day.condition}</span>
                      </div>
                    </div>
                    
                    <div className="forecast-right">
                      <div className="rain-chance">
                        <CloudRain className="rain-icon" />
                        <span className="rain-percentage">{day.rain}%</span>
                      </div>
                      <div className="temperature-range">
                        <span className="temp-high">{day.high}°</span>
                        <span className="temp-low">{day.low}°</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="weather-sidebar">
            {/* Weather Alerts */}
            <div className="alerts-card">
              <h3 className="alerts-title">
                <AlertTriangle className="alerts-icon" />
                Weather Alerts
              </h3>
              
              <div className="alerts-list">
                {alerts.map((alert, index) => (
                  <div key={index} className={`alert-item ${getAlertBg(alert.type)}`}>
                    <div className="alert-content">
                      {getAlertIcon(alert.type)}
                      <div className="alert-text">
                        <h4 className="alert-title">{alert.title}</h4>
                        <p className="alert-message">{alert.message}</p>
                        <p className="alert-time">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farming Recommendations */}
            <div className="farming-tips-card">
              <h3 className="farming-tips-title">Today's Farming Tips</h3>
              
              <div className="farming-tips-list">
                <div className="tip-item tip-irrigation">
                  <div className="tip-content">
                    <Droplets className="tip-icon tip-icon-green" />
                    <div>
                      <h4 className="tip-title tip-title-green">Irrigation</h4>
                      <p className="tip-description tip-description-green">Good humidity levels. Reduce irrigation frequency.</p>
                    </div>
                  </div>
                </div>
                
                <div className="tip-item tip-spraying">
                  <div className="tip-content">
                    <Wind className="tip-icon tip-icon-blue" />
                    <div>
                      <h4 className="tip-title tip-title-blue">Spraying</h4>
                      <p className="tip-description tip-description-blue">Moderate wind speed. Good for pesticide application.</p>
                    </div>
                  </div>
                </div>
                
                <div className="tip-item tip-fieldwork">
                  <div className="tip-content">
                    <Sun className="tip-icon tip-icon-yellow" />
                    <div>
                      <h4 className="tip-title tip-title-yellow">Field Work</h4>
                      <p className="tip-description tip-description-yellow">Partly cloudy conditions ideal for outdoor activities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Statistics */}
            <div className="stats-card">
              <h3 className="stats-title">This Month</h3>
              
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-label">Total Rainfall</span>
                  <span className="stat-value stat-value-blue">45mm</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg Temperature</span>
                  <span className="stat-value stat-value-orange">27°C</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Sunny Days</span>
                  <span className="stat-value stat-value-yellow">18 days</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Rainy Days</span>
                  <span className="stat-value stat-value-blue">8 days</span>
                </div>
              </div>
            </div>

            {/* Location Settings */}
            <div className="location-card">
              <h3 className="location-title">Location Settings</h3>
              <p className="location-description">
                Update your location to get more accurate weather forecasts for your farm.
              </p>
              <button className="location-button">
                <MapPin className="location-button-icon" />
                <span>Update Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
