from transformers import pipeline


class FinBERTAgent:

    def __init__(self):

        self.classifier = pipeline(
            "sentiment-analysis",
            model="ProsusAI/finbert"
        )

    def analyze(self, text):

        result = self.classifier(text)[0]

        return {
            "label": result["label"],
            "score": round(result["score"], 4)
        }