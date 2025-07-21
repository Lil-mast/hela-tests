# Sandbox to Production Migration

This document outlines the steps to migrate the M-Pesa integration from the sandbox environment to production.

1.  **Change API Endpoints:** Update the `BASE_URL` in `mpesa/stk.py` to point to the production Safaricom API endpoints.
2.  **Update Credentials:** Replace the sandbox credentials with production credentials. This includes the Consumer Key, Consumer Secret, and Passkey. These should be stored securely as environment variables.
3.  **Register for Production:** Ensure you have gone through the Safaricom Go-Live process and your application has been approved for production access.
4.  **Update Callbacks:** The callback URL in `mpesa/stk.py` must be a publicly accessible HTTPS URL.
5.  **Thorough Testing:** Conduct thorough testing in the production environment to ensure everything is working as expected. This includes successful transactions, failed transactions, and callback handling.
