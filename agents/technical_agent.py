import yfinance as yf
from ta.momentum import RSIIndicator
from ta.trend import SMAIndicator, MACD

class TechnicalAgent:

    def analyze(self, ticker):

        # Download stock data
        df = yf.download(
            ticker,
            period="1y",
            auto_adjust=True
        )

        close = df["Close"].squeeze()

        # RSI
        rsi = RSIIndicator(close)
        latest_rsi = rsi.rsi().iloc[-1]

        # Moving Averages
        sma20 = SMAIndicator(close, window=20)
        sma50 = SMAIndicator(close, window=50)

        latest_sma20 = sma20.sma_indicator().iloc[-1]
        latest_sma50 = sma50.sma_indicator().iloc[-1]

        latest_price = close.iloc[-1]
        macd = MACD(close)

        latest_macd = macd.macd().iloc[-1]

        volume = df["Volume"].squeeze()

        latest_volume = volume.iloc[-1]

        average_volume = volume.tail(20).mean()
        score = 0

        # RSI
        if 40 <= latest_rsi <= 60:
            score += 20

        elif 30 <= latest_rsi < 40:
            score += 15

        elif 60 < latest_rsi <= 70:
            score += 15

        # MACD
        if latest_macd > 0:
            score += 20

        # Above SMA20
        if latest_price > latest_sma20:
            score += 20

        # Above SMA50
        if latest_price > latest_sma50:
            score += 20

        # Volume Confirmation
        if latest_volume > average_volume:
            score += 20
        if latest_price > latest_sma50:
            trend = "Bullish"
        else:
            trend = "Bearish"
        if score >= 80:
            recommendation = "BUY"

        elif score >= 50:
            recommendation = "HOLD"

        else:
            recommendation = "SELL"
        return {
            "ticker": ticker,
            "current_price": round(float(latest_price), 2),
            "rsi": round(float(latest_rsi), 2),
            "sma20": round(float(latest_sma20), 2),
            "sma50": round(float(latest_sma50), 2),
            "trend": trend,
            "technical_score": score,
            "recommendation": recommendation
        }