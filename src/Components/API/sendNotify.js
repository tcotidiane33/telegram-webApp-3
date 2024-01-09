import axios from "axios";
//const axios = require('axios');

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
            Transaction_Id: ${paymentInfo.transaction_id} \n ⤵️⤵️Copy To Check Status on https://telegram-web-app-3.vercel.app/notify or https://t.me/learnByMistake_bot⤵️⤵️
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

export default sendTelegramNotification;