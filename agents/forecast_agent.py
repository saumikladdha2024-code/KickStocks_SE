import joblib

import yfinance as yf

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator
from ta.trend import MACD

import pandas as pd

class ForecastAgent:

    def __init__(self):

        self.model = joblib.load(
            "models/forecast_model.pkl"
        )

    def forecast(self, ticker):
        df = yf.download(
            ticker,
            period="1y",
            auto_adjust=True
        )

        df.columns = df.columns.get_level_values(0)

        close = df["Close"]

        df["RSI"] = RSIIndicator(close).rsi()

        df["SMA20"] = SMAIndicator(
            close,
            window=20
        ).sma_indicator()
        
        df["SMA50"] = SMAIndicator(
            close,
            window=50
        ).sma_indicator()

        df["MACD"] = MACD(close).macd()

        df["Volatility"] = (
            close.pct_change()
            .rolling(20)
            .std()
        )

        df["Price_vs_SMA20"] = (
            (close - df["SMA20"])
            / df["SMA20"]
        )

        df["Price_vs_SMA50"] = (
            (close - df["SMA50"])
            / df["SMA50"]
        )

        df["Volume_Ratio"] = (
            df["Volume"]
            / df["Volume"].rolling(20).mean()
        )

        df = df.dropna()

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

        forecast = []

        current_close = float(close.iloc[-1])

        current_sma20 = float(latest["SMA20"])
        current_sma50 = float(latest["SMA50"])

        current_features = X.copy()

        for day in range(1, 11):

            prediction = float(self.model.predict(current_features)[0])

            forecast.append({
                "day": day,
                "predicted_close": round(prediction, 2)
            })

            current_close = prediction

            current_features.loc[:, "Price_vs_SMA20"] = (
                (current_close - current_sma20)
                / current_sma20
            )

            current_features.loc[:, "Price_vs_SMA50"] = (
                (current_close - current_sma50)
                / current_sma50
            )

        return {
            "ticker": ticker,
            "forecast": forecast
        }