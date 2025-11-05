import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Eye, 
  Compass,
  TrendingUp,
  AlertTriangle,
  Calendar,
  MapPin,
  Loader
} from 'lucide-react';
import './WeatherPage.css';

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationInput, setLocationInput] = useState('Mumbai');
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // ✅ WeatherAPI credentials
  const API_KEY = '525055127e4b4e509f893615250511';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  useEffect(() => {
    fetchWeatherData(locationInput);
  }, []);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Fetch current weather
      const currentResponse = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`
      );

      if (!currentResponse.ok) throw new Error('Failed to fetch weather data. Please check your API key and location.');
      const currentData = await currentResponse.json();

      // ✅ Fetch 7-day forecast
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`
      );

      if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data.');
      const forecastData = await forecastResponse.json();

      // ✅ Process current weather
      const current = {
        location: `${currentData.location.name}, ${currentData.location.region}`,
        temperature: Math.round(currentData.current.temp_c),
        condition: currentData.current.condition.text,
        description: currentData.current.condition.text,
        humidity: currentData.current.humidity,
        windSpeed: Math.round(currentData.current.wind_kph),
        visibility: Math.round(currentData.current.vis_km),
        pressure: currentData.current.pressure_mb,
        feelsLike: Math.round(currentData.current.feelslike_c),
        icon: currentData.current.condition.icon,
        uvIndex: currentData.current.uv
      };

      setCurrentWeather(current);

      // ✅ Process forecast data
      const dailyData = forecastData.forecast.forecastday.map((day, index) => ({
        day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : 
              new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        rain: day.day.daily_chance_of_rain || 0
      }));

      setForecast(dailyData);

      // ✅ Generate weather-based alerts
      generateWeatherAlerts(current, dailyData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.message || 'Failed to fetch weather data');
      setLoading(false);
    }
  };

  const generateWeatherAlerts = (current, forecastData) => {
    const newAlerts = [];

    const heavyRainDays = forecastData.filter(day => day.rain > 70);
    if (heavyRainDays.length > 0) {
      newAlerts.push({
        type: 'warning',
        title: 'Heavy Rainfall Expected',
        message: `Heavy rainfall expected on ${heavyRainDays[0].day}. Consider postponing field activities.`,
        time: 'Just now'
      });
    }

    if (current.humidity > 70) {
      newAlerts.push({
        type: 'info',
        title: 'High Humidity Alert',
        message: `Current humidity is ${current.humidity}%. Reduce irrigation frequency.`,
        time: 'Just now'
      });
    } else if (current.humidity < 40) {
      newAlerts.push({
        type: 'info',
        title: 'Optimal Irrigation Time',
        message: `Low humidity levels (${current.humidity}%). Good time for irrigation.`,
        time: 'Just now'
      });
    }

    if (current.windSpeed > 20) {
      newAlerts.push({
        type: 'warning',
        title: 'High Wind Alert',
        message: `Wind speed is ${current.windSpeed} km/h. Not recommended for pesticide spraying.`,
        time: 'Just now'
      });
    }

    setAlerts(newAlerts);
  };

  const handleLocationUpdate = () => {
    if (locationInput.trim()) {
      fetchWeatherData(locationInput);
    }
  };

  const getMainWeatherIcon = () => {
    const condition = currentWeather.condition?.toLowerCase() || '';
    if (condition.includes('clear')) return <Sun className="main-weather-icon" style={{ color: '#fde047' }} />;
    if (condition.includes('cloud')) return <Cloud className="main-weather-icon" style={{ color: '#ffffff' }} />;
    if (condition.includes('rain')) return <CloudRain className="main-weather-icon" style={{ color: '#ffffff' }} />;
    return <Sun className="main-weather-icon" style={{ color: '#fde047' }} />;
  };

  const getWeatherIcon = (condition) => {
    const cond = condition.toLowerCase();
    if (cond.includes('sun')) return <Sun className="weather-icon weather-icon-yellow" />;
    if (cond.includes('cloud')) return <Cloud className="weather-icon weather-icon-gray" />;
    if (cond.includes('rain')) return <CloudRain className="weather-icon weather-icon-blue" />;
    return <Sun className="weather-icon weather-icon-yellow" />;
  };

  const getAlertIcon = (type) =>
    type === 'warning' ? <AlertTriangle className="alert-icon alert-icon-orange" /> : <TrendingUp className="alert-icon alert-icon-blue" />;

  const getAlertBg = (type) => (type === 'warning' ? 'alert-warning' : 'alert-info');

  if (loading) {
    return (
      <div className="weather-container">
        <div className="weather-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <Loader style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite', margin: '0 auto', color: '#2563eb' }} />
            <p style={{ marginTop: '16px', fontSize: '18px', color: '#4b5563' }}>Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-container">
        <div className="weather-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <AlertTriangle style={{ width: '48px', height: '48px', margin: '0 auto', color: '#ea580c' }} />
            <p style={{ marginTop: '16px', fontSize: '18px', color: '#111827' }}>{error}</p>
            <button 
              onClick={() => fetchWeatherData(locationInput)}
              style={{ marginTop: '24px', padding: '12px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-container">
      <div className="weather-wrapper">
        {/* Header */}
        <div className="weather-header">
          <h1 className="weather-title"><Cloud className="weather-header-icon" /> Live Weather Insights</h1>
          <p className="weather-description">Real-time weather data and forecasts to help you make informed farming decisions</p>
        </div>

        <div className="weather-grid">
          {/* Current Weather */}
          <div className="current-weather-section">
            <div className="current-weather-card">
              <div className="current-weather-header">
                <div>
                  <div className="location-info"><MapPin className="location-icon" /><span className="location-text">{currentWeather.location}</span></div>
                  <h2 className="temperature-main">{currentWeather.temperature}°C</h2>
                  <p className="condition-main">{currentWeather.description}</p>
                  <p className="feels-like">Feels like {currentWeather.feelsLike}°C</p>
                </div>
                <div className="weather-display">
                  {getMainWeatherIcon()}
                  <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="weather-metrics">
                <div className="metric-card"><Droplets className="metric-icon" /><p>Humidity</p><p>{currentWeather.humidity}%</p></div>
                <div className="metric-card"><Wind className="metric-icon" /><p>Wind Speed</p><p>{currentWeather.windSpeed} km/h</p></div>
                <div className="metric-card"><Eye className="metric-icon" /><p>Visibility</p><p>{currentWeather.visibility} km</p></div>
                <div className="metric-card"><Compass className="metric-icon" /><p>Pressure</p><p>{currentWeather.pressure} mb</p></div>
              </div>
            </div>

            {/* Forecast */}
            <div className="forecast-card">
              <h3 className="forecast-title"><Calendar className="forecast-icon" /> {forecast.length}-Day Forecast</h3>
              <div className="forecast-list">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <div className="forecast-left">
                      <p className="day-name">{day.day}</p>
                      <div className="forecast-condition">
                        {getWeatherIcon(day.condition)}
                        <span>{day.condition}</span>
                      </div>
                    </div>
                    <div className="forecast-right">
                      <div className="rain-chance"><CloudRain className="rain-icon" /><span>{day.rain}%</span></div>
                      <div className="temperature-range"><span>{day.high}°</span> / <span>{day.low}°</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="weather-sidebar">
            {/* Alerts */}
            <div className="alerts-card">
              <h3 className="alerts-title"><AlertTriangle className="alerts-icon" /> Weather Alerts</h3>
              {alerts.length ? alerts.map((a, i) => (
                <div key={i} className={`alert-item ${getAlertBg(a.type)}`}>
                  {getAlertIcon(a.type)}
                  <div><h4>{a.title}</h4><p>{a.message}</p><small>{a.time}</small></div>
                </div>
              )) : <p>No alerts currently.</p>}
            </div>

            {/* Location Input */}
            <div className="location-card">
              <h3 className="location-title">Location Settings</h3>
              <p>Update your location to get accurate forecasts for your farm.</p>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationUpdate()}
                placeholder="Enter city name"
                style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px' }}
              />
              <button className="location-button" onClick={handleLocationUpdate}>
                <MapPin className="location-button-icon" /> <span>Update Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
};

export default Weather;
