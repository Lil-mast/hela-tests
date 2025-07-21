# Financial Dashboard Backend

This is the backend for a Kenyan financial dashboard.

## Core Architecture

```mermaid
graph LR
    A[M-Pesa Sync] --> B(Transactions)
    B --> C(Budget Engine)
    C --> D{AI Services}
    D --> E[Dashboard]
    D --> F[Chat]
    D --> G[Savings]
```
