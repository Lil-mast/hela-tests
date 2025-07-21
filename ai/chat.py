class KenyanFinancialAssistant:
    SYSTEM_PROMPT = """You are Hela, an AI for Kenyan users. Specialize in:
- M-Pesa/M-Shwari optimization
- Table banking advice
- SACCO comparisons
- Farming season finances
- Chama management
Format: Always show amounts in Ksh, suggest local providers"""

    def _generate_hustler_fund_advice(self):
        return "The Hustler Fund is a great way to get started with a small business. You can borrow up to Ksh 50,000. Make sure to repay on time to increase your limit."

    def _compare_saccos(self):
        return "When comparing SACCOs, look at their dividend rates, loan interest rates, and the types of loans they offer. Some popular SACCOs in Kenya include Stima SACCO, Unaitas, and Harambee SACCO."

    def handle_kenyan_specific_queries(self, query):
        # Special cases:
        if "hustler fund" in query:
            return self._generate_hustler_fund_advice()
        elif "sacco" in query:
            return self._compare_saccos()
        else:
            # In a real application, this would make a request to the OpenAI API
            return "I am Hela, your Kenyan financial assistant. How can I help you today?"
