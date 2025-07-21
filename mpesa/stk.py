import os

BASE_URL = os.environ.get("BASE_URL", "https://example.com")

def initiate_stk(phone, amount, purpose, user_id, module, goal_id=None, budget_category=None):
    """Sandbox-ready payment with goal linking"""
    params = {
        "account_ref": f"{user_id}_{purpose}",  # e.g. "user123_emergency_fund"
        "callback_url": f"{BASE_URL}/mpesa/{module}",  # Dynamic by dashboard section
        "metadata": {
            "goal_id": goal_id,
            "budget_category": budget_category
        }
    }
    # In a real application, this would make a request to the Safaricom API
    print(f"Initiating STK push with params: {params}")
    return {"status": "success", "message": "STK push initiated"}
