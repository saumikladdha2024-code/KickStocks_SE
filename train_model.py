import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


# Load dataset
df = pd.read_csv("multi_stock_training_data.csv")


# Create target
df["Target"] = (df["Return_7d"] > 0).astype(int)

# Features
X = df[[
    "RSI",
    "SMA20",
    "SMA50",
    "MACD",
    "Volume",
    "Volatility",
    "Price_vs_SMA20",
    "Price_vs_SMA50",
    "Volume_Ratio"
]]

# Labels
y = df["Target"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy:.2f}")
joblib.dump(
    model,
    "models/stock_model.pkl"
)

print("Model saved successfully!")

for feature, importance in zip(X.columns, model.feature_importances_):
    print(feature, round(importance, 4))