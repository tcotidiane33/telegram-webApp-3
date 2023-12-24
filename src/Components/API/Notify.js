import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import { Cinetpay } from './cinetpay';

const Notify = () => {
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        // Créez une instance de Cinetpay
        const cinetpay = new Cinetpay({
            apikey: '447088687629111c58c3573.70152188',
            site_id: 911501,
            notify_url: 'https://ecopayci.netlify.app/notify',
            return_url: 'https://ecopayci.netlify.app/notify',
            lang: 'fr',
        });
        
        // Exemple : Appel de la méthode sendNotify pour afficher une notification
        cinetpay.sendNotify('Ceci est un message de notification !');

        // Vous pouvez également utiliser cette méthode en réponse à un événement ou après une opération particulière
    }, []); // Vous pouvez ajuster les dépendances en fonction de votre logique

    return (
        <>
            <Nav />
            {/* Affichez la notification dans votre composant */}
            <div>{notificationMessage}</div>
        </>
    );
};

export default Notify;
