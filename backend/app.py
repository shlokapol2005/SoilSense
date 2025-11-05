from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Global variables for model and data
model = None
label_encoders = {}
df = None

def load_and_train_model():
    """Load dataset and train Random Forest model"""
    global model, label_encoders, df
    
    # Load the dataset
    df = pd.read_csv('Crop-and-fertilizer-dataset-combined_sorted.csv')
    
    # Create label encoders for categorical variables
    label_encoders['District_Name'] = LabelEncoder()
    label_encoders['Soil_color'] = LabelEncoder()
    label_encoders['Crop'] = LabelEncoder()
    
    # Encode categorical variables
    df['District_Encoded'] = label_encoders['District_Name'].fit_transform(df['District_Name'])
    df['Soil_Encoded'] = label_encoders['Soil_color'].fit_transform(df['Soil_color'])
    df['Crop_Encoded'] = label_encoders['Crop'].fit_transform(df['Crop'])
    
    # Prepare features and target
    X = df[['District_Encoded', 'Soil_Encoded', 'Temperature']]
    y = df['Crop_Encoded']
    
    # Train Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    model.fit(X, y)
    
    print("Model trained successfully!")
    print(f"Dataset shape: {df.shape}")
    print(f"Unique crops: {df['Crop'].nunique()}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        district = data.get('district')
        soil = data.get('soil')
        entered_temperature = float(data.get('temperature'))
        
        # Validate input
        if not district or not soil or not entered_temperature:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if district and soil are in the dataset
        if district not in df['District_Name'].values:
            return jsonify({'error': f'District "{district}" not found in dataset'}), 400
        
        if soil not in df['Soil_color'].values:
            return jsonify({'error': f'Soil color "{soil}" not found in dataset'}), 400
        
        # Step 1: Filter dataset by District + Soil Color
        filtered_by_district_soil = df[
            (df['District_Name'] == district) & 
            (df['Soil_color'] == soil)
        ].copy()
        
        if len(filtered_by_district_soil) == 0:
            return jsonify({'error': f'No data found for District "{district}" and Soil "{soil}"'}), 404
        
        # Step 2: Find the nearest temperature
        filtered_by_district_soil['temp_diff'] = abs(
            filtered_by_district_soil['Temperature'] - entered_temperature
        )
        nearest_temp = filtered_by_district_soil.loc[
            filtered_by_district_soil['temp_diff'].idxmin(), 
            'Temperature'
        ]
        
        # Step 3: Get all rows with the nearest temperature
        matching_rows = filtered_by_district_soil[
            filtered_by_district_soil['Temperature'] == nearest_temp
        ]
        
        # Step 4: Compute statistics from matching rows
        num_records = len(matching_rows)
        
        # Average N, P, K values
        avg_nitrogen = round(matching_rows['Nitrogen'].mean(), 2)
        avg_phosphorus = round(matching_rows['Phosphorus'].mean(), 2)
        avg_potassium = round(matching_rows['Potassium'].mean(), 2)
        avg_ph = round(matching_rows['pH'].mean(), 2)
        
        # Get unique crops and fertilizers
        unique_crops = sorted(matching_rows['Crop'].unique().tolist())
        unique_fertilizers = sorted(matching_rows['Fertilizer'].unique().tolist())
        
        # Prepare response
        response = {
            'District': district,
            'Soil': soil,
            'Entered_Temperature': entered_temperature,
            'Nearest_Temperature_Used': float(nearest_temp),
            'Temperature_Difference': abs(float(nearest_temp) - entered_temperature),
            'Number_of_Records': num_records,
            'Average_Nitrogen': avg_nitrogen,
            'Average_Phosphorus': avg_phosphorus,
            'Average_Potassium': avg_potassium,
            'Average_pH': avg_ph,
            'Available_Crops': unique_crops,
            'Recommended_Fertilizers': unique_fertilizers,
            'Summary': f'Found {num_records} records matching {district} + {soil} + {nearest_temp}°C'
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/districts', methods=['GET'])
def get_districts():
    """Get list of available districts"""
    districts = sorted(df['District_Name'].unique().tolist())
    return jsonify({'districts': districts})

@app.route('/soil_colors', methods=['GET'])
def get_soil_colors():
    """Get list of available soil colors"""
    colors = sorted(df['Soil_color'].unique().tolist())
    return jsonify({'soil_colors': colors})

@app.route('/temperature_range', methods=['GET'])
def get_temperature_range():
    """Get temperature range for a specific district and soil"""
    district = request.args.get('district')
    soil = request.args.get('soil')
    
    if not district or not soil:
        return jsonify({'error': 'District and soil parameters required'}), 400
    
    filtered_df = df[
        (df['District_Name'] == district) & 
        (df['Soil_color'] == soil)
    ]
    
    if len(filtered_df) == 0:
        return jsonify({'error': 'No data found for this combination'}), 404
    
    temps = sorted(filtered_df['Temperature'].unique().tolist())
    
    return jsonify({
        'district': district,
        'soil': soil,
        'available_temperatures': temps,
        'min_temperature': min(temps),
        'max_temperature': max(temps)
    })

if __name__ == '__main__':
    # Load and train model on startup
    load_and_train_model()
    
    # Run Flask app
    app.run(debug=True, host='127.0.0.1', port=5000)