const axios = require('axios');

const generatePaymentInfoText = (paymentInfo) => {
    // Générez le contenu du fichier texte en fonction des informations de paiement
    const content = `
Montant: ${paymentInfo.data.amount} ${paymentInfo.data.currency}
Description: ${paymentInfo.data.description}
Nom du client: ${paymentInfo.data.buyer_name}
Email du client: ${paymentInfo.data.cpm_email}
Téléphone du client: ${paymentInfo.data.cpm_customer_mobile}
Adresse du client: ${paymentInfo.data.cpm_customer_address}
Ville du client: ${paymentInfo.data.cpm_customer_city}
Transaction ID: ${paymentInfo.data.cpm_trans_id}
`;

    return content;
};

const createTextFile = (content) => {
    const blob = new Blob([content], { type: "text/plain" });
    return URL.createObjectURL(blob);
};

const sendTelegramNotification = async (paymentInfo) => {
    try {
        if (
            paymentInfo &&
            paymentInfo.code === "00" &&
            paymentInfo.message === "SUCCES" &&
            paymentInfo.data &&
            paymentInfo.data.amount &&
            paymentInfo.data.currency &&
            paymentInfo.data.status === "ACCEPTED" &&
            paymentInfo.data.payment_method &&
            paymentInfo.data.description &&
            paymentInfo.data.payment_date
        ) {
            // Générez le contenu du fichier texte
            const textContent = generatePaymentInfoText(paymentInfo);

            // Créez le fichier texte
            const textFileUrl = createTextFile(textContent);

            // Envoi du document en tant que fichier texte
            const apiToken = "447088687629111c58c3573.70152188";
            const chatId = "@library_ci";
            const telegramUrl = `https://api.telegram.org/bot${apiToken}/sendDocument`;

            const formData = new FormData();
            formData.append("chat_id", chatId);
            formData.append("document", textFileUrl, "payment_info.txt");
            formData.append("caption", "Informations de paiement");

            const response = await axios.post(telegramUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Réponse de Telegram API :", response.data);
            console.log("Document Telegram envoyé avec succès.");

            // Libérez l'URL de l'objet blob après l'envoi
            URL.revokeObjectURL(textFileUrl);
        } else {
            console.log("La réponse de CinetPay ne correspond pas au modèle souhaité. Aucun document Telegram n'a été envoyé.");
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi du document Telegram :", error.message);
        console.error("Réponse d'erreur de Telegram API :", error.response ? error.response.data : null);
    }
};

module.exports = sendTelegramNotification;
