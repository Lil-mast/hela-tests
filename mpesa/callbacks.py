from flask import Blueprint, request, jsonify

mpesa_callbacks = Blueprint('mpesa_callbacks', __name__)

@mpesa_callbacks.route('/mpesa/<module>', methods=['POST'])
def handle_callback(module):
    """Handles M-Pesa callbacks."""
    print(f"Received M-Pesa callback for module: {module}")
    print(request.json)
    # In a real application, you would process the callback data here
    return jsonify({"status": "success"})
