import yfinance as yf

from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator
from ta.trend import MACD

from agents.technical_agent import TechnicalAgent
from agents.news_sentiment_agent import NewsSentimentAgent
from agents.ml_agent import MLAgent


class MasterAgent:

    def __init__(self):

        self.technical_agent = TechnicalAgent()

        self.news_agent = NewsSentimentAgent()

        self.ml_agent = MLAgent()

    def analyze(self, ticker):

        # Technical Analysis
        technical = self.technical_agent.analyze(
            ticker
        )

        # News Analysis
        news = self.news_agent.analyze(
            ticker
        )

        stock = yf.Ticker(ticker)

        try:
            info = stock.info
        except Exception:
            info = {}

        exchange_map = {
            "NMS": "NASDAQ",
            "NYQ": "NYSE",
            "NSE": "NSE",
            "BSE": "BSE",
        }

        exchange = exchange_map.get(
            info.get("exchange"),
            info.get("exchange")
        )

        # Download latest stock data
        df = yf.download(
            ticker,
            period="1y",
            auto_adjust=True
        )

        df.columns = df.columns.get_level_values(0)

        close = df["Close"]

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
        
        df["MACD"] = MACD(close).macd()

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

        ml_result = self.ml_agent.analyze(df)

        ml_prediction = ml_result["ml_prediction"]

        up_probability = ml_result["up_probability"]
        
        technical_score = technical["technical_score"]

        ml_score = up_probability

        sentiment_score = (
             (news["average_sentiment"] + 1) / 2
        ) * 100

        final_score = (
            technical_score * 0.3
            + ml_score * 0.6
            + sentiment_score * 0.1
        )
        if final_score >= 70:
            final_recommendation = "BUY"
        elif final_score >= 50:
            final_recommendation = "HOLD"
        else:
            final_recommendation = "SELL"
        return {
    "ticker": ticker,
    "company_name": info.get("longName"),
    "exchange": info.get("exchange"),
    "sector": info.get("sector"),
    "industry": info.get("industry"),
    "current_price": info.get("currentPrice"),
    "previous_close": info.get("regularMarketPreviousClose"),
    "market_cap": info.get("marketCap"),
    "technical_score": technical_score,

    "news_sentiment": round(
        news["average_sentiment"],
        3
    ),

    "ml_prediction": ml_prediction,

    "up_probability": round(up_probability, 2),

    "final_score": round(
        final_score,
        2
    ),

    "recommendation": final_recommendation
}