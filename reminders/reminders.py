class KenyanReminders:
    def _calculate_kplc_reminder(self, data):
        """Calculates a reminder for a KPLC bill."""
        # Dummy logic
        return f"Reminder set for KPLC bill for {data['account']}. We will remind you 2 days before your tokens are estimated to run out."

    def _water_billing_cycle(self, data):
        """Calculates a reminder for a Nairobi Water bill."""
        # Dummy logic
        return f"Reminder set for Nairobi Water bill for {data['account']}. We will remind you based on the billing cycle, considering potential rationing schedules."

    def create_bill_reminder(self, data):
        """Smart scheduling for Kenyan bills"""
        if data['payee'] == 'KPLC':
            return self._calculate_kplc_reminder(data)
        elif data['payee'] == 'Nairobi Water':
            return self._water_billing_cycle(data)
        else:
            return f"Reminder set for {data['payee']} bill for {data['account']}."
