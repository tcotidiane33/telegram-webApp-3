import React, { useState } from "react";
import { Cinetpay } from "./cinetpay";
import axios from "axios";
import Nav from "../Nav/Nav";
import { calculateTotalPrice, getAllBookTitles, getQuantity } from "../../db/productSignals";

import "./test/paymentForm.css";

const Payment = () => {
    const [amount, setAmount] = useState(calculateTotalPrice.value);
    const [currency, setCurrency] = useState("XOF");
    const [channels, setChannels] = useState("ALL");
    const [description, setDescription] = useState(getAllBookTitles);
    const [metadata, setMetadata] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [customer_carts, setCustomerCarts] = useState(getQuantity.value);
    const [customer_email, setCustomerEmail] = useState("@gmail.com");
    const [customer_phone_number, setCustomerPhoneNumber] = useState("");
    const [customer_address, setCustomerAddress] = useState("Av 12 Rue 05 Treich");
    const [customer_city, setCustomerCity] = useState("Abidjan");

    const sendTelegramNotification = async (paymentInfo) => {
        try {
            const apiToken = "6465240701:AAEMjbjOjot0IcMYVjDBhbOLs21pl1RPMdQ";
            const chatId = "@library_ci";
            const telegramUrl = `https://api.telegram.org/bot${apiToken}/sendMessage`;

            const firstMessage = `
                Nouveau paiement reçu‼️
                ________________________________
                🟢 Montant: ${paymentInfo.amount} ${paymentInfo.currency}
                -------------------------------
                🟢 📚 Description: ${paymentInfo.description} 
                -------------------------------
                🟢 Nom du client: ${paymentInfo.customer_name}
                ________________________________
                🟢 Email du client: ${paymentInfo.customer_email}
                ________________________________
                🟢 Téléphone du client: ${paymentInfo.customer_phone_number}
                ________________________________
                🟢 Adresse du client: ${paymentInfo.customer_address}
                ________________________________
                🟢 Ville du client: ${paymentInfo.customer_city}
                ________________________________
                Transaction_Id: ⤵️⤵️Copy To Check Status on https://telegram-web-app-3.vercel.app/notify or https://t.me/learnByMistake_bot⤵️⤵️
            `;

            const secondMessage = `
                ${paymentInfo.transaction_id}
            `;

            // Envoi du premier message
            const response1 = await axios.post(telegramUrl, {
                chat_id: chatId,
                text: firstMessage,
                
            });

            console.log("Réponse de Telegram API (Message 1):", response1.data);
            console.log("Notification Telegram (Message 1) envoyée avec succès.");

            // Envoi du deuxième message
            const response2 = await axios.post(telegramUrl, {
                chat_id: chatId,
                text: secondMessage,
            });

            console.log("Réponse de Telegram API (Message 2):", response2.data);
            console.log("Notification Telegram (Message 2) envoyée avec succès.");
        } catch (error) {
            console.error("Erreur lors de l'envoi de la notification Telegram :", error.message);
            console.error("Réponse d'erreur de Telegram API:", error.response.data);
        }
    };



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
            metadata,
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
                notify_url: 'https://telegram-web-app-3.vercel.app/notify',
                return_url: 'https://telegram-web-app-3.vercel.app/',
                lang: 'fr',
                mode: 'PRODUCTION'
            });

            // Utilisez la méthode makePayment de Cinetpay pour effectuer le paiement
            const response = await [cp.makePayment, sendTelegramNotification](paymentConfig).then((response) => console.log(response))
                .catch((err) => console.log(err));
            console.log(response);

            // Envoyez la notification Telegram avec les détails du paiement
            // await sendTelegramNotification(paymentConfig);


        } catch (error) {
            // Gérez les erreurs de paiement ici
            console.error("Erreur de paiement :", error.message);
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
                <div>
                    <label>Meta Donnée :</label>
                    <input
                        type="text"
                        value={metadata}
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>

                {/* Nouvelles informations pour les paiements par carte bancaire */}
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
