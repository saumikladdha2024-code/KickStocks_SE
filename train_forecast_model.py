import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv("multi_stock_training_data.csv")

# Features
X = df[
    [
        "RSI",
        "SMA20",
        "SMA50",
        "MACD",
        "Volume",
        "Volatility",
        "Price_vs_SMA20",
        "Price_vs_SMA50",
        "Volume_Ratio",
    ]
]

# Target = Tomorrow's Close
y = df["Next_Close"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

# Train model
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=15,
    min_samples_leaf=5,
    random_state=42,
    n_jobs=-1,
)

model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)

print(f"Mean Absolute Error: {mae:.2f}")

# Save model
joblib.dump(
    model,
    "models/forecast_model.pkl"
)

print("Forecast model saved successfully!")

print("\nFeature Importance\n")

for feature, importance in zip(X.columns, model.feature_importances_):
    print(f"{feature:<20} {importance:.4f}")