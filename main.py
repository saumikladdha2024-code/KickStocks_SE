from agents.master_agent import MasterAgent

agent = MasterAgent()

result = agent.analyze("AAPL")

print("\n===== KICKSTOCKS REPORT =====")

print(f"Ticker: {result['ticker']}")

print(
    f"Technical Score: "
    f"{result['technical_score']}"
)

print(
    f"News Sentiment: "
    f"{result['news_sentiment']}"
)

print(
    f"ML Prediction: "
    f"{result['ml_prediction']}"
)

print(
    f"UP Probability: "
    f"{result['up_probability']}%"
)

print(
    f"Final Score: "
    f"{result['final_score']}"
)

print(
    f"Recommendation: "
    f"{result['recommendation']}"
)