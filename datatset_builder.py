import yfinance as yf
from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator


ticker = "AAPL"

df = yf.download(
    ticker,
    period="5y",
    auto_adjust=True
)

close = df["Close"].squeeze()

# Technical Features
df["RSI"] = RSIIndicator(close).rsi()

df["SMA20"] = SMAIndicator(close, window=20).sma_indicator()

df["SMA50"] = SMAIndicator(close, window=50).sma_indicator()

# Future Price (7 days later)
df["Future_Close"] = close.shift(-7)

# Future Return %
df["Return_7d"] = (
    (df["Future_Close"] - close)
    / close
) * 100

# Remove rows with missing values
df = df.dropna()

print(df[[
    "RSI",
    "SMA20",
    "SMA50",
    "Return_7d"
]].head())

# Save dataset
df.to_csv("aapl_training_data.csv")

print(f"\nRows in dataset: {len(df)}")
print("Dataset saved as aapl_training_data.csv")