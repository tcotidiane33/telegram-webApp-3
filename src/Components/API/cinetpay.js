    const axios = require('axios');
    const qs = require('querystring-es3');

    const baseUrl = 'https://api-checkout.cinetpay.com/v2/';

    function Cinetpay(config) {
        this.config = config;
    }

    Cinetpay.prototype.makePayment = async function (paymentConfig) {
        try {
            const response = await axios({
                url: baseUrl + 'payment',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({ ...paymentConfig, ...this.config }),
                timeout: 10000,
            });

            if (response.status === 200 && response.data.code === '201' && response.data.data) {
                localStorage.setItem('payment', JSON.stringify(response.data));
                window.location.href = response.data.data.payment_url;
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    Cinetpay.prototype.checkPayStatus = async function (transaction_id) {
        if (!transaction_id) {
            throw new TypeError('transaction_id or payment_token is required');
        }
        try {
            const response = await axios({
                url: baseUrl + 'payment/check',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({ transaction_id, ...this.config, token: transaction_id }),
                timeout: 10000,
            });

            if (response.status === 200 && response.data.code === '00' && response.data.data) {
                localStorage.setItem(transaction_id, JSON.stringify(response.data.data));
                return response.data;
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    Cinetpay.prototype.sendNotify = async function (transaction_id) {
        try {
            const response = await axios({
                url: baseUrl + 'payment/check',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({ transaction_id, ...this.config, token: transaction_id }),
                timeout: 3000,
            });

            if (response.data.code === '00' && response.data.message === 'SUCCES' && response.data.data) {
                localStorage.setItem(transaction_id, JSON.stringify(response.data.data));
                console.log(response.data.data);
                alert(response.data.data);
                return response.data;
            } else {
                return response.data;
            }
        
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    module.exports = { Cinetpay };
