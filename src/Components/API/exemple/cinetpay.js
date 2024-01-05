class CinetPay {
    constructor(site_id, apikey, mode = "PROD", version = 'v2', params = null) {
        this.URI_WEBSITE_PROD = 'www.cinetpay.com';
        this.URI_WEBSITE_DEV = 'www.sandbox.cinetpay.com';
        this.URI_CASH_DESK_PROD = 'secure.cinetpay.com';
        this.URI_CASH_DESK_DEV = 'secure.sandbox.cinetpay.com';

        this._cfg_cpm_page_action = "PAYMENT";
        this._cfg_cpm_payment_config = "SINGLE";
        this._cfg_cpm_version = null;
        this._cfg_cpm_language = "fr";
        this._cfg_cpm_currency = "XOF";
        this._cfg_cpm_trans_date = null;
        this._cfg_cpm_trans_id = null;
        this._cfg_cpm_designation = null;
        this._cfg_cpm_custom = null;
        this._cfg_cpm_amount = null;
        this._cfg_cpm_site_id = null;
        this._cfg_notify_url = null;
        this._cfg_return_url = null;
        this._cfg_cancel_url = null;
        this._cashDeskUri = null;
        this._signature = null;
        this._cpm_site_id = null;
        this._cpm_amount = null;
        this._cpm_trans_date = null;
        this._cpm_trans_id = null;
        this._cpm_custom = null;
        this._cpm_currency = null;
        this._cpm_payid = null;
        this._cpm_payment_date = null;
        this._cpm_payment_time = null;
        this._cpm_error_message = null;
        this._payment_method = null;
        this._cpm_phone_prefixe = null;
        this._cel_phone_num = null;
        this._cpm_ipn_ack = null;
        this._created_at = null;
        this._updated_at = null;
        this._cpm_result = null;
        this._cpm_trans_status = null;
        this._cpm_designation = null;
        this._buyer_name = null;
        this.platformUrl = null;

        this._use_ssl = false;
        this._use_sandbox = false;
        this._cfg_apikey = null;
        this._signatureUri = null;
        this._checkPayStatusUri = null;
        this._webSiteUri = null;
        this._debug = false;

        this._URI_GET_SIGNATURE_PROD = null;
        this._URI_GET_SIGNATURE_DEV = null;
        this._URI_CHECK_PAY_STATUS_PROD = null;
        this._URI_CHECK_PAY_STATUS_DEV = null;

        if (mode == "PROD") {
            this._use_sandbox = false;
            this._use_ssl = true;
        } else {
            this._use_sandbox = true;
        }

        this._URI_GET_SIGNATURE_PROD = `api.cinetpay.com/${version}/?method=getSignatureByPost`;
        this._URI_GET_SIGNATURE_DEV = `api.sandbox.cinetpay.com/${version}/?method=getSignatureByPost`;
        this._URI_CHECK_PAY_STATUS_PROD = `api.cinetpay.com/${version}/?method=checkPayStatus`;
        this._URI_CHECK_PAY_STATUS_DEV = `api.sandbox.cinetpay.com/${version}/?method=checkPayStatus`;

        if (params === null || (params['style'] !== undefined && params['style'] === true)) {
            const style = '<style>.cinetpay-button { white-space: nowrap; }.cinetpay-button .field-error {  border: 1px solid #FF0000; }.cinetpay-button .hide { display: none; }.cinetpay-button .error-box { background: #FFFFFF; border: 1px solid #DADADA; border-radius: 5px; padding: 8px; display: inline-block; }.cinetpay-button button { white-space: nowrap; overflow: hidden; border-radius: 13px; font-family: "Arial", bold, italic; font-weight: bold; font-style: italic; border: 1px solid #2ECC71; color: #000000; background: #2ECC71; position: relative; text-shadow: 0 1px 0 rgba(255,255,255,.5); cursor: pointer; z-index: 0; }.cinetpay-button button:before { content: " "; position: absolute; width: 100%; height: 100%; border-radius: 11px; top: 0; left: 0; background: #2ECC71; background: -webkit-linear-gradient(top, #28B463 0%,#28B463 80%,#FFF8FC 100%); background: -moz-linear-gradient(top, #28B463 0%,#28B463 80%,#FFF8FC 100%); background: -o-linear-gradient(top, #28B463 0%,#28B463 80%,#FFF8FC 100%); background: -ms-linear-gradient(top, #28B463 0%,#28B463 80%,#FFF8FC 100%); background: linear-gradient(to bottom, #28B463 0%,#28B463 80%,#FFF8FC 100%); z-index: -1; }.cinetpay-button button:active { color: #000000; background: #28B463; box-shadow: 0 2px 0 0 #1E8449; top: 2px; }body{ background: #F5F5F5; }</style>';
            document.write(style);
        }

        this._cfg_cpm_site_id = site_id;
        this._cfg_apikey = apikey;
        this._cfg_cpm_version = version;

        if (mode == "PROD") {
            this._webSiteUri = this.URI_WEBSITE_PROD;
            this._cashDeskUri = this.URI_CASH_DESK_PROD;
        } else {
            this._webSiteUri = this.URI_WEBSITE_DEV;
            this._cashDeskUri = this.URI_CASH_DESK_DEV;
        }

        this._signatureUri = this._use_sandbox ? this._URI_GET_SIGNATURE_DEV : this._URI_GET_SIGNATURE_PROD;
        this._checkPayStatusUri = this._use_sandbox ? this._URI_CHECK_PAY_STATUS_DEV : this._URI_CHECK_PAY_STATUS_PROD;

        if (params !== null) {
            for (const [key, value] of Object.entries(params)) {
                this[`_${key}`] = value;
            }
        }
    }

    setDebug(debug) {
        this._debug = debug;
    }

    async signature() {
        const data = {
            site_id: this._cfg_cpm_site_id,
            apikey: this._cfg_apikey,
            currency: this._cfg_cpm_currency,
            transaction_id: this._cfg_cpm_trans_id,
            amount: this._cfg_cpm_amount,
            designation: this._cfg_cpm_designation,
            custom: this._cfg_cpm_custom,
            buyer_name: this._buyer_name,
            buyer_phone: this._cel_phone_num,
            buyer_phone_prefixe: this._cpm_phone_prefixe,
            buyer_address: this._cpm_address,
            buyer_city: this._cpm_city,
            buyer_postal_code: this._cpm_postal_code,
            buyer_country: this._cpm_country,
            notify_url: this._cfg_notify_url,
            return_url: this._cfg_return_url,
            cancel_url: this._cfg_cancel_url,
            lang: this._cfg_cpm_language,
            transaction_date: this._cfg_cpm_trans_date,
            payment_config: this._cfg_cpm_payment_config,
            payment_method: this._payment_method,
            merchant_service_provider: this._cpm_merchant_service_provider,
            display_customer: this._display_customer,
            customer_email: this._cpm_email,
            customer_id: this._cpm_customer_id,
            customer_mobile: this._cpm_customer_mobile,
            customer_first_name: this._cpm_customer_first_name,
            customer_last_name: this._cpm_customer_last_name,
            customer_company: this._cpm_customer_company,
            customer_address: this._cpm_customer_address,
            customer_city: this._cpm_customer_city,
            customer_postal_code: this._cpm_customer_postal_code,
            customer_country: this._cpm_customer_country,
            signature: this._signature,
        };
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        const signatureUrl = `https://${this._signatureUri}`;
        const response = await fetch(signatureUrl, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.cpm_result === '00') {
                return responseData.cpm_signature;
            } else {
                throw new Error(`Failed to get signature: ${responseData.cpm_error_message}`);
            }
        } else {
            throw new Error(`Failed to get signature. HTTP status ${response.status}`);
        }
    }

    async payment() {
        this._debugLog('Payment initiated.');
        this._signature = await this.signature();

        const form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', `https://${this._webSiteUri}/paiement`);


        const fields = {
            cpm_site_id: this._cfg_cpm_site_id,
            cpm_payid: this._cpm_payid,
            cpm_amount: this._cfg_cpm_amount,
            cpm_trans_id: this._cfg_cpm_trans_id,
            cpm_trans_date: this._cfg_cpm_trans_date,
            cpm_currency: this._cfg_cpm_currency,
            cpm_custom: this._cfg_cpm_custom,
            cpm_designation: this._cfg_cpm_designation,
            cpm_language: this._cfg_cpm_language,
            signature: this._signature,
            notify_url: this._cfg_notify_url,
            return_url: this._cfg_return_url,
            cancel_url: this._cfg_cancel_url,
            cpm_payment_config: this._cfg_cpm_payment_config,
            cpm_page_action: this._cfg_cpm_page_action,
            cpm_version: this._cfg_cpm_version,
            display_customer: this._display_customer,
            cpm_merchant_service_provider: this._cpm_merchant_service_provider,
            cpm_phone_prefixe: this._cpm_phone_prefixe,
            cel_phone_num: this._cel_phone_num,
            cpm_address: this._cpm_address,
            cpm_city: this._cpm_city,
            cpm_postal_code: this._cpm_postal_code,
            cpm_country: this._cpm_country,
            cpm_email: this._cpm_email,
            cpm_customer_id: this._cpm_customer_id,
            cpm_customer_mobile: this._cpm_customer_mobile,
            cpm_customer_first_name: this._cpm_customer_first_name,
            cpm_customer_last_name: this._cpm_customer_last_name,
            cpm_customer_company: this._cpm_customer_company,
            cpm_customer_address: this._cpm_customer_address,
            cpm_customer_city: this._cpm_customer_city,
            cpm_customer_postal_code: this._cpm_customer_postal_code,
            cpm_customer_country: this._cpm_customer_country,
        };

        for (const [key, value] of Object.entries(fields)) {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', value);
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();

        this._debugLog('Payment form submitted.');
    }

    _debugLog(message) {
        if (this._debug) {
            console.log(`CinetPay Debug: ${message}`);
        }
    }
}

// Exemple d'utilisation de la classe CinetPay en JavaScript
// const cinetPayInstance = new CinetPay("911501", "447088687629111c58c3573.70152188");
// cinetPayInstance.displayPayButton("form", 1, "large");

export default CinetPay;