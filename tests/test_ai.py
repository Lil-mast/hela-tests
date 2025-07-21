from ai.chat import KenyanFinancialAssistant

def test_kenyan_context():
    assistant = KenyanFinancialAssistant()
    response = assistant.handle_kenyan_specific_queries("How can I save for school fees?")
    # A more robust test would check for specific keywords
    assert "Hela" in response

    response = assistant.handle_kenyan_specific_queries("Tell me about the hustler fund")
    assert "Hustler Fund" in response

    response = assistant.handle_kenyan_specific_queries("What is a good sacco?")
    assert "SACCO" in response
