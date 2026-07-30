class DecisionAgent:

    def analyze(self, technical_score, sentiment_score):

        final_score = (technical_score * 0.7) + (sentiment_score * 30)

        if final_score >= 70:
            recommendation = "BUY"

        elif final_score >= 40:
            recommendation = "HOLD"

        else:
            recommendation = "SELL"

        return {
            "final_score": round(final_score, 2),
            "recommendation": recommendation
        }