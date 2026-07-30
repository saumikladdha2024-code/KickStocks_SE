import feedparser
from textblob import TextBlob


class NewsAgent:

    def analyze(self, company):

        url = f"https://news.google.com/rss/search?q={company}+stock"

        feed = feedparser.parse(url)

        results = []

        for entry in feed.entries[:10]:

            headline = entry.title

            sentiment_score = TextBlob(headline).sentiment.polarity

            if sentiment_score > 0:
                sentiment = "Positive"

            elif sentiment_score < 0:
                sentiment = "Negative"

            else:
                sentiment = "Neutral"

            results.append({
                "headline": headline,
                "sentiment": sentiment,
                "score": round(sentiment_score, 2)
            })

        total_score = 0

        for item in results:
            total_score += item["score"]

        average_sentiment = total_score / len(results)

        return {
            "headlines": results,
            "average_sentiment": round(average_sentiment, 2)
        }