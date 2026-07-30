# 📈 KickStocks

> AI-powered stock analysis platform built with Machine Learning, Technical Analysis, News Sentiment, and a modern React dashboard.

![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Machine Learning](https://img.shields.io/badge/ML-Random%20Forest-orange)
![License](https://img.shields.io/badge/License-MIT-red)

---

## 🚀 Overview

KickStocks is an AI-powered stock analysis platform that combines:

- 📊 Technical Indicators
- 📰 News Sentiment Analysis
- 🤖 Machine Learning
- 📈 10-Day Price Forecasting

to generate intelligent Buy / Hold / Sell recommendations.

Unlike traditional stock dashboards, KickStocks uses multiple AI agents that collaborate before producing the final recommendation.

---

# ✨ Features

## 📊 Technical Analysis

- RSI
- SMA20
- SMA50
- Trend Detection
- Technical Score

---

## 📰 News Sentiment

- Live Financial News
- AI Sentiment Analysis
- Bullish / Neutral / Bearish detection

---

## 🤖 Machine Learning

- Random Forest Classifier
- Buy / Hold / Sell Prediction
- Probability Score

---

## 📈 AI Forecast

- Recursive 10-Day Closing Price Forecast
- Historical Trend Learning

---

## 📉 Historical Charts

- Interactive Price Charts
- Multiple Timeframes

---

## 🔥 Stock Scanner

Ranks multiple stocks using

- Technical Score
- News Sentiment
- ML Probability
- Final AI Score

---

## ⭐ Watchlist

- Save favorite stocks
- Quick access

---
# 📸 Screenshots

## Dashboard

![Dashboard](assets/dashboard.png)

---

## Stock Analysis

![Analysis](assets/analysis.png)

---

## Forecast

![Forecast](assets/forecast.png)

---

## Watchlist

![Watchlist](assets/watchlist.png)

# 🏗 Architecture

```
React Dashboard
        │
        ▼
 FastAPI Backend
        │
 ┌──────┼────────┐
 │      │        │
 ▼      ▼        ▼
Technical  News  ML
 Agent    Agent Agent
 │         │      │
 └──────┬──┴──────┘
        ▼
 Decision Agent
        │
        ▼
 BUY / HOLD / SELL
```

---

# 🛠 Tech Stack

### Frontend

- React
- Vite
- TailwindCSS
- Axios
- Framer Motion
- Recharts

### Backend

- FastAPI
- Python

### Machine Learning

- Scikit-Learn
- Random Forest
- Pandas
- NumPy

### Finance

- yfinance
- ta

### AI / NLP

- Transformers
- FinBERT

---

# 📂 Project Structure

```
KickStocks/
│
├── agents/
├── backend/
├── kickstocks-frontend/
├── models/
├── data/
│
├── requirements.txt
└── README.md
```

---

# 🚀 Future Improvements

- Portfolio Tracker
- Candlestick Charts
- Real-time WebSocket Prices
- LSTM Forecasting
- AI Chat Assistant
- Email Alerts
- Backtesting Engine

---

# 👨‍💻 Author

**Saumik Laddha**

Built as a Machine Learning + Full Stack portfolio project.