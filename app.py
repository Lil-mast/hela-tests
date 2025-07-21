from flask import Flask
from mpesa.callbacks import mpesa_callbacks
from dashboard.overview import dashboard_overview
from goals.tracking import goal_tracking

app = Flask(__name__)
app.register_blueprint(mpesa_callbacks)
app.register_blueprint(dashboard_overview)
app.register_blueprint(goal_tracking)

@app.route('/')
def index():
    return "Welcome to the Financial Dashboard API!"

if __name__ == '__main__':
    app.run(debug=True)
