from agents.master_agent import MasterAgent

stocks = [
    "AAPL",
    "MSFT",
    "NVDA",
    "META",
    "GOOGL",
    "AMZN",
    "TSLA"
]

agent = MasterAgent()

results = []

for stock in stocks:

    try:

        result = agent.analyze(stock)

        results.append(result)

        print(f"Finished {stock}")

    except Exception as e:

        print(f"Error with {stock}: {e}")



results.sort(
    key=lambda x: x["final_score"],
    reverse=True
)

print("\n===== TOP OPPORTUNITIES =====\n")

for i, stock in enumerate(results, start=1):

    print(f"\n{i}. {stock['ticker']}")

    print(
        f"Technical Score: "
        f"{stock['technical_score']}"
    )

    print(
        f"News Sentiment: "
        f"{stock['news_sentiment']}"
    )

    print(
        f"ML Probability: "
        f"{stock['up_probability']}%"
    )

    print(
        f"Final Score: "
        f"{stock['final_score']}"
    )

    print(
        f"Recommendation: "
        f"{stock['recommendation']}"
    )