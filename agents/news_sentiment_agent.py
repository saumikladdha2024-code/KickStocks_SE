import feedparser

from agents.finbert_agent import FinBERTAgent


class NewsSentimentAgent:

    def __init__(self):

        self.finbert = FinBERTAgent()

    def analyze(self, company):

        url = f"https://news.google.com/rss/search?q={company}+stock"

        feed = feedparser.parse(url)

        results = []

        total_score = 0

        for entry in feed.entries[:10]:

            headline = entry.title

            sentiment = self.finbert.analyze(
                headline
            )

            label = sentiment["label"]

            score = sentiment["score"]

            if label == "positive":
                total_score += score

            elif label == "negative":
                total_score -= score

            results.append({
                "headline": headline,
                "label": label,
                "score": score
            })

        average_sentiment = total_score / len(results)

        return {
            "average_sentiment": round(
                average_sentiment,
                3
            ),
            "news": results
        }