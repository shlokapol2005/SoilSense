
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv('Crop-and-fertilizer-dataset-combined.csv')

# Encode categorical columns
le_district = LabelEncoder()
le_soil = LabelEncoder()

df['District_Name'] = le_district.fit_transform(df['District_Name'])
df['Soil_color'] = le_soil.fit_transform(df['Soil_color'])

# Save encoders
joblib.dump(le_district, 'models/le_district.pkl')
joblib.dump(le_soil, 'models/le_soil.pkl')

# --- Stage 1: Predict N, P, K ---
X = df[['District_Name', 'Soil_color', 'Temperature']]
y_N, y_P, y_K = df['Nitrogen'], df['Phosphorus'], df['Potassium']

model_N = RandomForestRegressor().fit(X, y_N)
model_P = RandomForestRegressor().fit(X, y_P)
model_K = RandomForestRegressor().fit(X, y_K)

joblib.dump(model_N, 'models/model_N.pkl')
joblib.dump(model_P, 'models/model_P.pkl')
joblib.dump(model_K, 'models/model_K.pkl')

# --- Stage 2: Predict Crop ---
X_crop = df[['District_Name', 'Soil_color', 'Nitrogen', 'Phosphorus', 'Potassium', 'Temperature']]
y_crop = df['Crop']

crop_model = RandomForestClassifier().fit(X_crop, y_crop)
joblib.dump(crop_model, 'models/crop_model.pkl')

print("✅ All models trained and saved successfully!")
