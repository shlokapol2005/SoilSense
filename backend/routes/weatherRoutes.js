// routes/weatherRoutes.js
const express = require('express');
const Weather = require('../models/Weather');

const router = express.Router();

// Save weather data
router.post('/save', async (req, res) => {
  try {
    const { userId, city, weatherData, forecastData } = req.body;

    if (!city || !weatherData) {
      return res.status(400).json({
        success: false,
        message: 'City and weather data are required!',
      });
    }

    // Create new weather record
    const newWeather = new Weather({
      userId: userId || null,
      city,
      location: weatherData.location,
      temperature: weatherData.temperature,
      condition: weatherData.condition,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      visibility: weatherData.visibility,
      pressure: weatherData.pressure,
      feelsLike: weatherData.feelsLike,
      forecast: forecastData || [],
    });

    await newWeather.save();

    res.status(201).json({
      success: true,
      message: 'Weather data saved successfully!',
      data: newWeather,
    });
  } catch (error) {
    console.error('Save weather error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving weather data!',
    });
  }
});

// Get weather history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const weatherHistory = await Weather.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: weatherHistory,
    });
  } catch (error) {
    console.error('Get weather history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weather history!',
    });
  }
});

// Get all weather searches (for admin or analytics)
router.get('/all', async (req, res) => {
  try {
    const allWeather = await Weather.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: allWeather.length,
      data: allWeather,
    });
  } catch (error) {
    console.error('Get all weather error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data!',
    });
  }
});

// Delete weather record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWeather = await Weather.findByIdAndDelete(id);

    if (!deletedWeather) {
      return res.status(404).json({
        success: false,
        message: 'Weather record not found!',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Weather record deleted successfully!',
    });
  } catch (error) {
    console.error('Delete weather error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting weather record!',
    });
  }
});

module.exports = router;