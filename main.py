import json

def generate_output():
    output = {
        "dashboard": {
            "modules": ["overview", "transactions", "budget", "goals"],
            "kenyan_context": {
                "default_currency": "Ksh",
                "local_providers": ["M-Pesa", "KCB", "Equitel"]
            }
        },
        "api_docs": {
            "mpesa_integration": "sandbox_to_production_migration.md",
            "ai_prompts": "kenyan_financial_context.md"
        }
    }
    return json.dumps(output, indent=4)

if __name__ == '__main__':
    print(generate_output())
