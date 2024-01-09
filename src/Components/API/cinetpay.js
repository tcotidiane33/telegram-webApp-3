/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import axios from 'axios';
// import crypto from 'crypto';
// import { response } from 'express';

//const axios = require('axios');
const { CinetPayConfig, PaymentConfig } = require('./models');
const qs = require('querystring-es3');

const baseUrl = 'https://api-checkout.cinetpay.com/v2/';

export class Cinetpay {
    constructor(config) {
        this.config = new CinetPayConfig(config);
    }

    makePayment = async (paymentConfig) => {
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


    checkPayStatus = async (transaction_id) => {
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

            if (response.status === 200 && response.data.code === '00'  && response.data.data) {
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

    sendNotify = async (transaction_id) => {

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

            if (response.data.code === '00' && response.data.data) {
                localStorage.setItem(transaction_id, JSON.stringify(response.data.data));
                console.log(response.data.data);
                // alert(response.data.data);
                return response.data;
            } else {
                return response.data;
            }
           
        } catch (error) {
            console.log(error);
            throw error;
        }
        // alert(response.data);
        // console.log('Notification:', response.data);
    }
}
