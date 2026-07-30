// MOCK DATA — stands in for GET /scanner until the API integration phase.
// Shape matches the real backend response exactly:
// { ticker, technical_score, news_sentiment, ml_prediction, up_probability, final_score, recommendation }
// `name` is UI-only (see utils/tickerNames.js) and is not part of the backend contract.

export const MOCK_SCANNER_DATA = [
  { ticker: "NVDA", technical_score: 82, news_sentiment: 0.41, ml_prediction: "UP", up_probability: 78, final_score: 79.4, recommendation: "BUY" },
  { ticker: "AAPL", technical_score: 60, news_sentiment: -0.028, ml_prediction: "UP", up_probability: 59, final_score: 58.26, recommendation: "HOLD" },
  { ticker: "MSFT", technical_score: 74, news_sentiment: 0.22, ml_prediction: "UP", up_probability: 68, final_score: 71.8, recommendation: "BUY" },
  { ticker: "TSLA", technical_score: 38, news_sentiment: -0.35, ml_prediction: "DOWN", up_probability: 31, final_score: 33.5, recommendation: "SELL" },
  { ticker: "GOOGL", technical_score: 65, news_sentiment: 0.12, ml_prediction: "UP", up_probability: 62, final_score: 64.1, recommendation: "HOLD" },
  { ticker: "AMZN", technical_score: 70, news_sentiment: 0.18, ml_prediction: "UP", up_probability: 65, final_score: 68.3, recommendation: "BUY" },
  { ticker: "META", technical_score: 55, news_sentiment: -0.09, ml_prediction: "DOWN", up_probability: 47, final_score: 49.7, recommendation: "HOLD" },
  { ticker: "AMD", technical_score: 44, news_sentiment: -0.21, ml_prediction: "DOWN", up_probability: 36, final_score: 38.9, recommendation: "SELL" },
  { ticker: "NFLX", technical_score: 77, news_sentiment: 0.31, ml_prediction: "UP", up_probability: 73, final_score: 75.6, recommendation: "BUY" },
  { ticker: "INTC", technical_score: 29, news_sentiment: -0.44, ml_prediction: "DOWN", up_probability: 24, final_score: 27.1, recommendation: "SELL" },
  { ticker: "JPM", technical_score: 58, news_sentiment: 0.05, ml_prediction: "UP", up_probability: 54, final_score: 56.0, recommendation: "HOLD" },
  { ticker: "V", technical_score: 67, news_sentiment: 0.15, ml_prediction: "UP", up_probability: 61, final_score: 63.9, recommendation: "HOLD" },
];