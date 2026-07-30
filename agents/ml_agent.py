import joblib
import pandas as pd


class MLAgent:

    def __init__(self):
        self.model = joblib.load("models/stock_model.pkl")

    def analyze(self, df):

        latest = df.iloc[-1]

        X = pd.DataFrame([{
            "RSI": float(latest["RSI"]),
            "SMA20": float(latest["SMA20"]),
            "SMA50": float(latest["SMA50"]),
            "MACD": float(latest["MACD"]),
            "Volume": float(latest["Volume"]),
            "Volatility": float(latest["Volatility"]),
            "Price_vs_SMA20": float(latest["Price_vs_SMA20"]),
            "Price_vs_SMA50": float(latest["Price_vs_SMA50"]),
            "Volume_Ratio": float(latest["Volume_Ratio"])
        }])

        prediction = self.model.predict(X)
        probabilities = self.model.predict_proba(X)

        up_probability = float(round(probabilities[0][1] * 100, 2))

        ml_prediction = "UP" if prediction[0] == 1 else "DOWN"

        return {
            "ml_prediction": ml_prediction,
            "up_probability": up_probability
        }