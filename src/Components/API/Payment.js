
import React, { useState } from "react";
import { Cinetpay } from "./cinetpay";
import axios from "axios";
import Nav from "../Nav/Nav";
import sendTelegramNotification from "./sendNotify";
import { calculateTotalPrice, getAllBookTitles, getQuantity } from "../../db/productSignals";
import "./test/paymentForm.css";

//const axios = require('axios');

const Payment = () => {
    const [amount, setAmount] = useState(calculateTotalPrice.value);
    const [currency, setCurrency] = useState("XOF");
    const [channels, setChannels] = useState("ALL");
    const [description, setDescription] = useState(getAllBookTitles);
    // const [metadata, setMetadata] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [customer_carts, setCustomerCarts] = useState(getQuantity.value);
    const [customer_email, setCustomerEmail] = useState("");
    const [customer_phone_number, setCustomerPhoneNumber] = useState("");
    const [customer_address, setCustomerAddress] = useState("Av 12 Rue 05 Treich");
    const [customer_city, setCustomerCity] = useState("Abidjan");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Générez un ID de transaction unique
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        const uniqId = s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

        // Créez l'objet de configuration du paiement à partir des valeurs du formulaire
        const paymentConfig = {
            transaction_id: uniqId,
            amount,
            currency,
            channels,
            description,
            // metadata,
            customer_name,
            customer_carts,
            customer_email,
            customer_phone_number,
            customer_address,
            customer_city,
        };

        try {
            // Initialisez votre instance Cinetpay avec les informations de configuration
            const cp = new Cinetpay({
                apikey: '447088687629111c58c3573.70152188',
                site_id: 911501,
                notify_url: 'https://telegram-web-app-3.vercel.app/notify/:transId',
                return_url: 'https://telegram-web-app-3.vercel.app/return/:transId',
                cancel_url: 'https://telegram-web-app-3.vercel.app',
                lang: 'fr',
                mode: 'PROD'
            });




            // 1. Effectuer le paiement
            const paymentResponse = await cp.makePayment(paymentConfig);
            console.log('Réponse du paiement :', paymentResponse);
            await cp.sendNotify(paymentConfig.transaction_id).then((response) => console.log(response)).catch((err) => console.log(err));
            await sendTelegramNotification(paymentConfig);

            // Stockez l'ID de transaction dans le stockage local pour la vérification ultérieure
            localStorage.setItem('transactionId', paymentConfig.transaction_id);

            // const { makePayment } = cp;
            // Utilisez Promise.all pour exécuter les deux fonctions en parallèle
            // Promise.all([makePayment(paymentConfig), sendTelegramNotification(paymentConfig)])
            // Promise.all([makePayment(paymentConfig), sendTelegramNotification(paymentConfig)])
            //     .then(([paymentResponse, telegramResponse]) => {
            //         // Faites quelque chose avec les deux réponses ici
            //         console.log('Réponse du paiement:', paymentResponse);
            //         console.log('Réponse de la notification Telegram:', telegramResponse);
            //     })
            //     .catch((err) => {
            //         // Gérez les erreurs ici
            //         console.error('Erreur lors de l\'exécution en parallèle :', err);
            //     });

            // Utilisez la méthode makePayment de Cinetpay pour effectuer le paiement
            // const response = await cp.makePayment(paymentConfig).then((response) => console.log(response))
            //     .catch((err) => console.log(err));
            // await cp.checkPayStatus(paymentConfig.transaction_id).then((response) => console.log(response)).catch((err) => console.log(err));
            // await cp.sendNotify(paymentConfig.transaction_id).then((response) => console.log(response)).catch((err) => console.log(err));
            // await sendTelegramNotification(paymentConfig);
            // console.log(response);






        } catch (error) {
            // Gérer les erreurs ici
            console.error('Erreur lors du processus de paiement :', error);

            // Vous pouvez également traiter les erreurs spécifiques ici si nécessaire
            if (error.response) {
                console.error('Réponse d\'erreur de Cinetpay API :', error.response.data);
            }
        }
    };
    return (
        <>
            <Nav />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Montant:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        readOnly
                    />
                </div>
                <div>
                    <label>Devise:</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    />
                </div>
                <div>
                    <label>Canal:</label>
                    <input
                        type="text"
                        value={channels}
                        onChange={(e) => setChannels(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        style={{ width: '100%', height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '1rem', overflow: 'visible', background: 'yellow', fontWeight: '900' }}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        readOnly
                    />

                </div>
                {/*   <div>
                    <label>Meta Donnée :</label>
                    <input
                        type="text"
                        value={metadata}
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>

               Nouvelles informations pour les paiements par carte bancaire */}
                <div>
                    <label>Nom et Prénom du client:</label>
                    <input
                        type="text"
                        value={customer_name}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Commandes du client:</label>
                    <textarea
                        style={{ width: '100%', height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '1rem', overflow: 'visible', background: 'yellow', fontWeight: '900' }}
                        type="text"
                        value={customer_carts}
                        onChange={(e) => setCustomerCarts(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email du client:</label>
                    <input
                        type="email"
                        value={customer_email}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Téléphone du client:</label>
                    <input
                        type="tel"
                        value={customer_phone_number}
                        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>Adresse du client:</label>
                    <input
                        type="text"
                        value={customer_address}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ville du client:</label>
                    <input
                        type="text"
                        value={customer_city}
                        onChange={(e) => setCustomerCity(e.target.value)}
                    />
                </div>
                <button type="submit">Effectuer le Paiement</button>
            </form>

        </>
    );
};

export default Payment;
