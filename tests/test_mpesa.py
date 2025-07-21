import json
from app import app

def test_mpesa_callback():
    client = app.test_client()
    # Simulate a callback for the 'goals' module
    response = client.post('/mpesa/goals', data=json.dumps({
        "TransactionType": "Pay Bill",
        "TransID": "MPESA12345",
        "TransTime": "20230101120000",
        "TransAmount": "1000",
        "BusinessShortCode": "123456",
        "BillRefNumber": "user123_goal1",
        "InvoiceNumber": "",
        "OrgAccountBalance": "",
        "ThirdPartyTransID": "",
        "MSISDN": "254712345678",
        "FirstName": "John",
        "MiddleName": "",
        "LastName": "Doe"
    }), content_type='application/json')

    assert response.status_code == 200
    assert response.json == {"status": "success"}
