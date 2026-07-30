import time
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from concurrent.futures import ThreadPoolExecutor
from apscheduler.schedulers.background import BackgroundScheduler
from agents.master_agent import MasterAgent
from agents.forecast_agent import ForecastAgent

import yfinance as yf
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = MasterAgent()
forecast_agent = ForecastAgent()
scanner_cache = []

@app.get("/")
def home():

    return {
        "message": "Welcome to KickStocks API"
    }


@app.get("/analyze/{ticker}")
def analyze_stock(ticker: str):

    result = agent.analyze(
        ticker.upper()
    )

    return result

@app.get("/forecast/{ticker}")
def forecast_stock(ticker: str):

    return forecast_agent.forecast(
        ticker.upper()
    )


def update_scanner_cache():

    global scanner_cache

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

    # 📊 Major Indices
    "^NSEI",
    "^BSESN",
    "^GSPC",
    "^NDX",
    "^DJI",
    ]

    start = time.time()

    results = []

    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {
            executor.submit(agent.analyze, stock): stock
            for stock in stocks
        }
        for future, stock in futures.items():
            try:
                result = future.result()
                
                if result:
                    results.append(result)
            except Exception as e:
                print(f"Failed to analyze {stock}: {e}")

    results.sort(
            key=lambda x: x["final_score"],
            reverse=True
        )

    scanner_cache = results
    end = time.time()

    print(f"\nScanner cache updated in {end-start:.2f} seconds\n")
@app.on_event("startup")

def startup():
    print("Loading scanner cache...")
    update_scanner_cache()

    scheduler = BackgroundScheduler()
    scheduler.add_job(update_scanner_cache, "interval", minutes=5)
    scheduler.start()
@app.get("/scanner")

@app.get("/scanner")
def scanner():
    return scanner_cache

PERIOD_INTERVAL_MAP = {
    "1d": "5m",
    "5d": "15m",
    "1mo": "1d",
    "3mo": "1d",
    "6mo": "1d",
    "1y": "1d",
}


@app.get("/history/{ticker}")
def get_history(
    ticker: str,
    period: str = Query("1mo")
):

    ticker = ticker.upper().strip()

    if period not in PERIOD_INTERVAL_MAP:
        raise HTTPException(
            status_code=400,
            detail="Invalid period."
        )

    interval = PERIOD_INTERVAL_MAP[period]

    try:

        stock = yf.Ticker(ticker)

        hist = stock.history(
        period=period,
        interval=interval,
        auto_adjust=True
    )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="Unable to fetch history."
        )

    if hist.empty:

        raise HTTPException(
            status_code=404,
            detail="No historical data found."
        )
    
    hist = hist.reset_index()
    

    date_column = "Datetime" if "Datetime" in hist.columns else "Date"

    data = []

    for _, row in hist.iterrows():

        data.append({

            "date": row[date_column].isoformat(),

            "open": round(float(row["Open"]), 2),

            "high": round(float(row["High"]), 2),

            "low": round(float(row["Low"]), 2),

            "close": round(float(row["Close"]), 2),

            "volume": int(row["Volume"])

        })

    return data