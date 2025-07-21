from flask import Blueprint, jsonify

dashboard_overview = Blueprint('dashboard_overview', __name__)

def calculate_net_worth(user_id):
    """Calculates the net worth of a user."""
    # Dummy data
    return 500000

def get_30day_cashflow(user_id):
    """Gets the 30-day cashflow of a user."""
    # Dummy data
    return {"inflow": 100000, "outflow": 50000}

def active_goals_with_completion(user_id):
    """Gets the active goals with completion status."""
    # Dummy data
    return [{"goal_name": "Emergency Fund", "completion": 0.5}]

def generate_weekly_tips(user_id):
    """Generates weekly financial tips for a user."""
    # Dummy data
    return ["Pay yourself first!", "Track your spending."]

@dashboard_overview.route('/dashboard/overview/<user_id>')
def get_overview(user_id):
    """Returns structured data for all dashboard cards"""
    return jsonify({
        "snapshots": {
            "net_worth": calculate_net_worth(user_id),
            "cashflow": get_30day_cashflow(user_id),
            "goal_progress": active_goals_with_completion(user_id)
        },
        "ai_tips": generate_weekly_tips(user_id)
    })
