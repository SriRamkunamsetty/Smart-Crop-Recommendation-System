from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load Model and Scaler
MODEL_PATH = os.path.join(os.path.dirname(__(__file__)), '../model/crop_model.pkl')
SCALER_PATH = os.path.join(os.path.dirname(__(__file__)), '../model/scaler.pkl')

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
except:
    model = None
    scaler = None
    print("Warning: Model or scaler not found. Please run train.py first.")

def get_fertilizer_recommendation(n, p, k):
    """Simple logic-based fertilizer recommendation."""
    suggestions = []
    
    # Standard threshold values
    if n < 50:
        suggestions.append("Apply Urea to increase Nitrogen content.")
    if p < 50:
        suggestions.append("Apply DAP (Diammonium Phosphate) to boost Phosphorus.")
    if k < 50:
        suggestions.append("Apply Muriate of Potash to improve Potassium levels.")
        
    if not suggestions:
        suggestions.append("Soil NPk levels are optimal. Standard compost recommended.")
        
    return suggestions

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        if not model or not scaler:
            return "Model not trained yet! Please run the training script.", 500
            
        try:
            # Extract form values
            n = float(request.form['nitrogen'])
            p = float(request.form['phosphorus'])
            k = float(request.form['potassium'])
            temperature = float(request.form['temperature'])
            humidity = float(request.form['humidity'])
            ph = float(request.form['ph'])
            rainfall = float(request.form['rainfall'])

            # Preprocess
            features = np.array([[n, p, k, temperature, humidity, ph, rainfall]])
            features_scaled = scaler.transform(features)

            # Predict
            predictions = model.predict(features_scaled)
            probabilities = model.predict_proba(features_scaled)[0]
            
            # Get top 3
            top_3_indices = np.argsort(probabilities)[::-1][:3]
            classes = model.classes_
            
            top_crop = classes[top_3_indices[0]]
            top_3_crops = [classes[i] for i in top_3_indices]
            confidence = probabilities[top_3_indices[0]] * 100

            # Fertilizer
            fertilizers = get_fertilizer_recommendation(n, p, k)

            return render_template('result.html', 
                                   crop=top_crop, 
                                   top_crops=top_3_crops, 
                                   confidence=round(confidence, 2),
                                   fertilizers=fertilizers)
                                   
        except Exception as e:
            return render_template('error.html', error=str(e))
            
    return render_template('predict.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
