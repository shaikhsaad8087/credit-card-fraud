import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import threading

app = Flask(__name__)
CORS(app)

# Global variables for model and data
model = None
feature_columns = []

def train_model():
    global model, feature_columns
    print("Training model...")
    try:
        credit_data = pd.read_csv("creditcard.csv")
        
        # Balance data as in credit.py
        legit = credit_data[credit_data.Class == 0]
        fraud = credit_data[credit_data.Class == 1]
        legit_sample = legit.sample(n=min(len(legit), 492), random_state=2)
        new_dataset = pd.concat([legit_sample, fraud], axis=0)
        
        X = new_dataset.drop(['Class'], axis=1)
        y = new_dataset['Class']
        feature_columns = X.columns.tolist()
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=2)
        
        model = LogisticRegression(max_iter=1000)
        model.fit(X_train, y_train)
        print("Model trained successfully!")
    except Exception as e:
        print(f"Error training model: {e}")

# Train the model in a background thread to not block server startup
threading.Thread(target=train_model).start()

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model training in progress. Please try again in a few seconds."}), 503
    
    try:
        data = request.get_json()
        
        # Map frontend data to model features
        # Frontend: { amount, time, type, category, merchant }
        # Backend features: Time, V1-V28, Amount
        
        amount = float(data.get('amount', 0))
        time = float(data.get('time', 0)) * 3600 # Convert hours to seconds if needed, or mapping
        
        # Create a full feature vector
        # Since we don't have V1-V28 from the UI, we'll use realistic defaults or 0s
        # For a "live" feel, we can fluctuate some values based on 'type' or 'category'
        features = {}
        for col in feature_columns:
            features[col] = 0.0
            
        features['Amount'] = amount
        features['Time'] = time
        
        # Mocking some "intelligence": If it's a wire transfer or high amount, 
        # let's set some V features to typical fraud patterns
        if data.get('type') == 'Wire Transfer' or amount > 5000:
            features['V14'] = -5.0 # Often a strong indicator in this dataset
            features['V17'] = -5.0
            
        # Convert to DataFrame with correct column order
        X_input = pd.DataFrame([features])[feature_columns]
        
        prediction_code = model.predict(X_input)[0]
        prediction_label = "Fraud" if prediction_code == 1 else "Legit"
        
        # Get probability
        probs = model.predict_proba(X_input)[0]
        confidence = probs[prediction_code]
        
        return jsonify({
            "prediction": prediction_label,
            "confidence": float(confidence),
            "timestamp": pd.Timestamp.now().isoformat()
        })
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ready" if model else "training"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
