import joblib
import pandas as pd
import yfinance as yf

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator


# Load trained model
model = joblib.load("models/stock_model.pkl")

# Download latest data
df = yf.download(
    "AAPL",
    period="1y",
    auto_adjust=True
)

close = df["Close"].squeeze()

from ta.trend import MACD

# Indicators
df["RSI"] = RSIIndicator(close).rsi()

df["SMA20"] = SMAIndicator(
    close,
    window=20
).sma_indicator()

df["SMA50"] = SMAIndicator(
    close,
    window=50
).sma_indicator()

macd = MACD(close)

df["MACD"] = macd.macd()

# New Features

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
    "RSI": float(latest["RSI"].iloc[0]),
    "SMA20": float(latest["SMA20"].iloc[0]),
    "SMA50": float(latest["SMA50"].iloc[0]),
    "MACD": float(latest["MACD"].iloc[0]),
    "Volume": float(latest["Volume"].iloc[0]),
    "Volatility": float(latest["Volatility"].iloc[0]),
    "Price_vs_SMA20": float(latest["Price_vs_SMA20"].iloc[0]),
    "Price_vs_SMA50": float(latest["Price_vs_SMA50"].iloc[0]),
    "Volume_Ratio": float(latest["Volume_Ratio"].iloc[0])
}])

prediction = model.predict(X)

probabilities = model.predict_proba(X)

down_probability = probabilities[0][0]
up_probability = probabilities[0][1]

print(f"Probability DOWN: {down_probability:.2%}")
print(f"Probability UP: {up_probability:.2%}")

if prediction[0] == 1:
    print("Prediction: UP")
else:
    print("Prediction: DOWN")