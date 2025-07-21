class MpesaDataHandler:
    def anonymize_transactions(self):
        # Required by Kenyan Data Protection Act
        return {
            "store_phone_last4": True,
            "mask_reference": True
        }
