# 🌱 **SoilSense: Smart Soil Quality Analyzer & Fertilizer Recommendation System**

# **Overview**
SoilSense is an intelligent web application designed to assist farmers and agriculturalists in analyzing soil quality and recommending suitable crops and fertilizers. By combining machine learning, real-time weather data, and an interactive interface, SoilSense provides users with accurate and data-driven insights for better crop productivity and sustainable farming.

#  **Problem Statement**

Farmers often face challenges such as:
Lack of awareness about their soil’s nutrient composition (NPK & pH).
Incorrect fertilizer usage leading to soil degradation.
Absence of localized, data-backed recommendations.
SoilSense bridges this gap by offering smart soil analysis using ML, personalized fertilizer suggestions, and weather-based insights.

# **Tech Stack**
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


🌦️ **External API**

OpenWeatherMap API — fetches real-time temperature and weather data for the user’s region.

# **Database**
Database: **MongoDB Compass** (Localhost)

**Collections**:

prediction_history → Stores each prediction record

District, Soil Type, Temperature

Recommended Crops & Fertilizers

Nutrient Averages (N, P, K, pH)

Timestamp

**Configuration**:

Connection String: mongodb://127.0.0.1:27017/


Database Name: soilsense_db

Collection Name: prediction_history

Collection Name: User

Collection Name : Fetched Weather data


1) **Backend Setup (Flask + ML Model)**

-- Clone the repository

git clone https://github.com/shlokapol2005/SoilSense.git

cd SoilSense/backend

-- Create a virtual environment

python -m venv .venv

Activate it

-- For Windows:

.venv\Scripts\activate

-- For macOS/Linux:

source .venv/bin/activate

-- Install dependencies

pip install -r requirements.txt

Then run the **Flask backend:**

python app.py



2) **Frontend Setup (React + Vite)**
   cd ../frontend

-- Install dependencies

npm install

-- Start the React app

npm run dev

3) **MongoDB setup**
   cd../backend
   
   node server.js
