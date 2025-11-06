// models/Weather.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  windSpeed: {
    type: Number,
    required: true,
  },
  visibility: {
    type: Number,
    required: true,
  },
  pressure: {
    type: Number,
    required: true,
  },
  feelsLike: {
    type: Number,
    required: true,
  },
  forecast: [{
    date: String,
    high: Number,
    low: Number,
    condition: String,
    rain: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Weather', weatherSchema);