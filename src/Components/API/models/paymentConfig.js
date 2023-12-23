/* eslint-disable @typescript-eslint/no-explicit-any */

export class PaymentConfig {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(obj = {}) {
      this.transaction_id = obj.transaction_id;
      this.amount = obj.amount;
      this.currency = obj.currency;
      this.description = obj.description;
      this.customer_id = obj.customer_id;
      this.customer_name = obj.customer_name;
      this.customer_surname = obj.customer_surname;
      this.channels = obj.channels;
      this.metadata = obj.metadata;
      this.customer_phone_number = obj.customer_phone_number;
      this.customer_email = obj.customer_email;
      this.customer_address = obj.customer_address;
      this.customer_city = obj.customer_city;
      this.customer_country = obj.customer_country;
      this.customer_state = obj.customer_state;
      this.customer_zip_code = obj.customer_zip_code;
    }
  }
  