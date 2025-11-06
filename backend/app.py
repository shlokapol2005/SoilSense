from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# ===== MongoDB Setup =====

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["soilsense_db"]
history_collection = db["prediction_history"]


model = None
label_encoders = {}
df = None


def load_and_train_model():
    """Load dataset and train Random Forest model"""
    global model, label_encoders, df

    df = pd.read_csv('Crop-and-fertilizer-dataset-combined_sorted.csv')

   
    label_encoders['District_Name'] = LabelEncoder()
    label_encoders['Soil_color'] = LabelEncoder()
    label_encoders['Crop'] = LabelEncoder()

    
    df['District_Encoded'] = label_encoders['District_Name'].fit_transform(df['District_Name'])
    df['Soil_Encoded'] = label_encoders['Soil_color'].fit_transform(df['Soil_color'])
    df['Crop_Encoded'] = label_encoders['Crop'].fit_transform(df['Crop'])

    # Train Random Forest model
    X = df[['District_Encoded', 'Soil_Encoded', 'Temperature']]
    y = df['Crop_Encoded']

    model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    model.fit(X, y)

    print("✅ Model trained successfully!")
    print(f"📊 Dataset shape: {df.shape}")
    print(f"🌾 Unique crops: {df['Crop'].nunique()}")


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        district = data.get('district')
        soil = data.get('soil')
        entered_temperature = float(data.get('temperature'))

        if not district or not soil or not entered_temperature:
            return jsonify({'error': 'Missing required fields'}), 400

        if district not in df['District_Name'].values:
            return jsonify({'error': f'District "{district}" not found'}), 400

        if soil not in df['Soil_color'].values:
            return jsonify({'error': f'Soil "{soil}" not found'}), 400

        # Filter dataset for district + soil
        filtered = df[(df['District_Name'] == district) & (df['Soil_color'] == soil)]
        if filtered.empty:
            return jsonify({'error': 'No data found for this combination'}), 404

        # Find the nearest temperature
        filtered['temp_diff'] = abs(filtered['Temperature'] - entered_temperature)
        nearest_temp = filtered.loc[filtered['temp_diff'].idxmin(), 'Temperature']
        match = filtered[filtered['Temperature'] == nearest_temp]

        num_records = len(match)
        avg_n = round(match['Nitrogen'].mean(), 2)
        avg_p = round(match['Phosphorus'].mean(), 2)
        avg_k = round(match['Potassium'].mean(), 2)
        avg_ph = round(match['pH'].mean(), 2)

        crops = sorted(match['Crop'].unique().tolist())

        # ===== Build crop-specific fertilizers =====
        crops_with_fertilizers = {}
        for crop_name in crops:
            crop_data = match[match['Crop'] == crop_name]
            crop_ferts = sorted(crop_data['Fertilizer'].unique().tolist())
            crops_with_fertilizers[crop_name] = crop_ferts

        
        all_fertilizers = sorted(match['Fertilizer'].unique().tolist())
        summary = f"Found {num_records} matching records for {district} district with {soil} soil at {nearest_temp}°C"
        
        response = {
            'District': district,
            'Soil': soil,
            'Entered_Temperature': entered_temperature,
            'Nearest_Temperature_Used': float(nearest_temp),
            'Average_Nitrogen': avg_n,
            'Average_Phosphorus': avg_p,
            'Average_Potassium': avg_k,
            'Average_pH': avg_ph,
            'Available_Crops': crops,
            'Recommended_Fertilizers': all_fertilizers,
            'Crops_With_Fertilizers': crops_with_fertilizers,  
            'Records_Found': num_records
        }

        # ===== Save to MongoDB history =====
        history_collection.insert_one({
            **response,
            "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
        })

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/history', methods=['GET'])
def get_history():
    """Fetch all past predictions from MongoDB"""
    records = list(history_collection.find({}, {'_id': 0}).sort("timestamp", -1))
    return jsonify({'history': records})


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})


@app.route('/districts', methods=['GET'])
def get_districts():
    districts = sorted(df['District_Name'].unique().tolist())
    return jsonify({'districts': districts})


@app.route('/soil_colors', methods=['GET'])
def get_soil_colors():
    colors = sorted(df['Soil_color'].unique().tolist())
    return jsonify({'soil_colors': colors})


if __name__ == '__main__':
    load_and_train_model()
    app.run(debug=True, host='127.0.0.1', port=5000)
