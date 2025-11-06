🌱 **SoilSense: Smart Soil Quality Analyzer & Fertilizer Recommendation System**

📘 **Overview**
SoilSense is an intelligent web application designed to assist farmers and agriculturalists in analyzing soil quality and recommending suitable crops and fertilizers. By combining machine learning, real-time weather data, and an interactive interface, SoilSense provides users with accurate and data-driven insights for better crop productivity and sustainable farming.

🚜 **Problem Statement**

Farmers often face challenges such as:
Lack of awareness about their soil’s nutrient composition (NPK & pH).
Incorrect fertilizer usage leading to soil degradation.
Absence of localized, data-backed recommendations.
SoilSense bridges this gap by offering smart soil analysis using ML, personalized fertilizer suggestions, and weather-based insights.

👩‍💻 **Tech Stack**
🧠 **Machine Learning**

Python, pandas, numpy, scikit-learn
Algorithm: Random Forest Classifier
Purpose: Predict suitable crops and recommend fertilizers based on soil properties and temperature.

🌐 **Backend**

Flask (Python REST API)
MongoDB Compass (Local Database) for storing historical predictions
pymongo for database operations

💻 **Frontend**

React.js + Vite (for UI rendering)
HTML, CSS, JavaScript
UI/UX designed in Figma

🌦️ **External API**

OpenWeatherMap API — fetches real-time temperature and weather data for the user’s region.

**Data Flow**
🔹 **Prediction Flow**

User enters input (District, Soil Type, Temperature).

Flask /predict API:

Predicts suitable crops & fertilizers using the ML model.

Stores input + output in MongoDB.

Returns prediction result to frontend.

🔹 **History Flow**

When user visits the History Page, React calls /history.

Flask retrieves all stored predictions from MongoDB.

React displays results dynamically as history cards.
