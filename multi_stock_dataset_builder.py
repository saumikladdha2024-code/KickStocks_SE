import pandas as pd
import yfinance as yf
import feedparser

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator
from ta.trend import MACD
from textblob import TextBlob

stocks = [
    # 🇺🇸 US Stocks
    "AAPL",
    "MSFT",
    "NVDA",
    "AMZN",
    "GOOGL",
    "META",
    "TSLA",
    "AMD",
    "NFLX",
    "PLTR",
    "AVGO",
    "ORCL",
    "IBM",
    "JPM",
    "V",

    # 🇮🇳 Indian Stocks
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "ITC.NS",
    "LT.NS",
    "BHARTIARTL.NS",
    "HINDUNILVR.NS",
]

all_data = []

for ticker in stocks:

    print(f"Downloading {ticker}...")

    try:

        df = yf.download(
            ticker,
            period="5y",
            auto_adjust=True
        )

        df.columns = df.columns.get_level_values(0)

        close = df["Close"].squeeze()

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

# Volume
        df["Volume"] = df["Volume"]

# Volatility
        df["Volatility"] = (
            close.pct_change()
            .rolling(20)
            .std()
        )

# Price relative to moving averages
        df["Price_vs_SMA20"] = (
            (close - df["SMA20"])
            / df["SMA20"]
        )

        df["Price_vs_SMA50"] = (
            (close - df["SMA50"])
            / df["SMA50"]
        )

# Relative volume
        df["Volume_Ratio"] = (
            df["Volume"]
            / df["Volume"].rolling(20).mean()
        )

        # -------------------------
        # Classification Target
        # -------------------------
        df["Future_Close"] = close.shift(-7)

        df["Return_7d"] = (
              (df["Future_Close"] - close)
        / close
        ) * 100

# -------------------------
# Forecasting Target
# -------------------------
        df["Next_Close"] = close.shift(-1)

        df["Ticker"] = ticker

        df = df.dropna()

        all_data.append(df)

    except Exception as e:

        print(f"Error with {ticker}: {e}")



final_df = pd.concat(all_data)

final_df.to_csv(
    "multi_stock_training_data.csv",
    index=False
)

print(f"\nRows: {len(final_df)}")
print("Dataset saved successfully!")