from flask import Blueprint, request, jsonify

goal_tracking = Blueprint('goal_tracking', __name__)

@goal_tracking.route('/goals/update', methods=['POST'])
def update_goal():
    """Handles M-Pesa goal contributions"""
    data = request.json
    if data.get('source') == 'mpesa':
        # In a real application, you would verify the transaction via Safaricom API
        amount = data.get('amount', 0)
        goal_name = data.get('goal_name', 'Unknown Goal')
        current = data.get('current', 0)
        target = data.get('target', 0)

        prompt = f"""
        User deposited Ksh {amount} toward {goal_name}.
        Current: Ksh {current}/{target}.
        Generate encouraging Kenyan-style progress message.
        """
        # In a real application, this would make a request to the OpenAI API
        print(f"Generating progress message with prompt: {prompt}")
        # Dummy message
        message = f"Great job! You're one step closer to reaching your goal of Ksh {target} for {goal_name}."
        return jsonify({"status": "success", "message": message})

    return jsonify({"status": "error", "message": "Invalid request"})
