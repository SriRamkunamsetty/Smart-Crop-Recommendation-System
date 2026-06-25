import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

def create_dummy_data():
    """Generates synthetic crop data if a dataset isn't provided."""
    np.random.seed(42)
    n_samples = 1000
    
    data = {
        'N': np.random.randint(0, 140, n_samples),
        'P': np.random.randint(5, 145, n_samples),
        'K': np.random.randint(5, 205, n_samples),
        'temperature': np.random.uniform(8.8, 43.6, n_samples),
        'humidity': np.random.uniform(14.2, 99.9, n_samples),
        'ph': np.random.uniform(3.5, 9.9, n_samples),
        'rainfall': np.random.uniform(20.0, 298.5, n_samples),
        'label': np.random.choice(['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 
                                   'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 
                                   'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 
                                   'coconut', 'cotton', 'jute', 'coffee'], n_samples)
    }
    return pd.DataFrame(data)

def main():
    print("🌾 Starting Crop Recommendation ML Pipeline...")
    
    # 1. Load Data
    dataset_path = '../dataset/crop_data.csv'
    if os.path.exists(dataset_path):
        df = pd.read_csv(dataset_path)
    else:
        print("Dataset not found. Generating synthetic data for demonstration...")
        df = create_dummy_data()
        os.makedirs('../dataset', exist_ok=True)
        df.to_csv(dataset_path, index=False)

    # 2. EDA (Exploratory Data Analysis)
    print("\n--- Exploratory Data Analysis ---")
    print(df.head())
    print("\nDataset Info:")
    print(df.info())
    print("\nMissing Values:")
    print(df.isnull().sum())
    
    # 3. Data Preprocessing
    X = df.drop('label', axis=1)
    y = df['label']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 4. Model Training
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000),
        'Decision Tree': DecisionTreeClassifier(),
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'KNN': KNeighborsClassifier(n_neighbors=5)
    }

    results = {}
    best_model = None
    best_accuracy = 0

    print("\n--- Model Training and Evaluation ---")
    for name, model in models.items():
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
        acc = accuracy_score(y_test, y_pred)
        results[name] = acc
        print(f"{name} Accuracy: {acc * 100:.2f}%")
        
        if acc > best_accuracy:
            best_accuracy = acc
            best_model = model

    print("\n🏆 Best Model:", max(results, key=results.get))

    # Detailed Evaluation for Best Model
    print("\n--- Best Model Classification Report ---")
    best_preds = best_model.predict(X_test_scaled)
    print(classification_report(y_test, best_preds))

    # 5. Save the Model and Scaler
    os.makedirs('../model', exist_ok=True)
    joblib.dump(best_model, '../model/crop_model.pkl')
    joblib.dump(scaler, '../model/scaler.pkl')
    print("\n✅ Model and scaler saved successfully to '/model' directory!")

if __name__ == "__main__":
    main()
