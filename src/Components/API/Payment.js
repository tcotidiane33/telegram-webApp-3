import React, { useState } from "react";
import { Cinetpay } from "./cinetpay"; // Assurez-vous que le chemin est correct
import Nav from "../Nav/Nav";
import { calculateTotalPrice } from "../../db/productSignals";

import "./test/paymentForm.css";


const Payment = () => {
    const [amount, setAmount] = useState(calculateTotalPrice.value);
    const [currency, setCurrency] = useState("XOF");
    const [channels, setChannels] = useState("ALL");
    const [description, setDescription] = useState("Livre - Test de paiement");
    const [customer_name, setCustomerName] = useState("");
    const [customer_carts, setCustomerCarts] = useState("");
    const [customer_email, setCustomerEmail] = useState("");
    const [customer_phone_number, setCustomerPhoneNumber] = useState("");
    const [customer_address, setCustomerAddress] = useState("");
    const [customer_city, setCustomerCity] = useState("");

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
                notify_url: 'https://library.netlify.app/notify',
                return_url: 'https://library.netlify.app/',
                lang: 'fr',
            });

            // Utilisez la méthode makePayment de Cinetpay pour effectuer le paiement
            const response = await cp.makePayment(paymentConfig).then((response) => console.log(response))
                .catch((err) => console.log(err));
            
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
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <input
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
