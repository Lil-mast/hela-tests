SAVINGS_PROVIDERS = {
    "mpesa": {
        "endpoints": {
            "balance": "https://api.safaricom.co.ke/mpesa/account/balance/v1",
            "auth_type": "Bearer"
        },
        "sandbox_test_balance": 5000  # Mock value
    },
    "kcb": {
        "api_docs": "https://developer.kcbbankgroup.com"
    }
}
