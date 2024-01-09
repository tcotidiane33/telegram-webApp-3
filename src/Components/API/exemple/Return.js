import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Cinetpay } from '../cinetpay';
import Nav from '../../Nav/Nav';
import sendTelegramNotification from "../sendNotify";
import './CheckPaymentStatus.css';
import axios from "axios";


const Return = ({ handleCheckPaymentStatusProp }) => {
    const [state, setState] = useState({
        paymentResult: null,
        error: null,
        loading: false,
    });

    const { transactionId, paymentResult, error, loading } = state;
    const { uniqId } = useParams();
    const history = useHistory();

    useEffect(() => {
        console.log('Transaction ID:', uniqId);
        setState((prevState) => ({ ...prevState, transactionId: uniqId }));
        handleCheckPaymentStatusProp(history);
    }, [uniqId, handleCheckPaymentStatusProp, history]);

    const handleCheckPaymentStatus = async (transactionId) => {
        try {
            setState((prevState) => ({ ...prevState, loading: true }));
            const cp = new Cinetpay({
                apikey: '447088687629111c58c3573.70152188',
                site_id: 911501,
                notify_url: 'https://telegram-web-app-3.vercel.app/notify',
                return_url: 'https://telegram-web-app-3.vercel.app/return',
                lang: 'fr',
                mode: 'PRODUCTION'
            });

            const result = await cp.checkPayStatus(uniqId);
            console.log("reponse du check", result);
            // Call the sendNotify method on the instance
            const makeNotify = await cp.sendNotify(uniqId);
            sendTelegramNotification(makeNotify);

            setState((prevState) => ({ ...prevState, paymentResult: result.data, error: null }));


            // Utilisez Promise.all pour exécuter les deux fonctions en parallèle
            // Promise.all([cp.sendNotify(transactionId),sendTelegramNotification(makeNotify)])
            //     .then(([paymentResponse, telegramResponse]) => {
            //         // Faites quelque chose avec les deux réponses ici
            //         console.log('Réponse du paiement:', paymentResponse);
            //         console.log('Réponse de la notification Telegram:', telegramResponse);
            //     })
            //     .catch((err) => {
            //         // Gérez les erreurs ici
            //         console.error('Erreur lors de l\'exécution en parallèle :', err);
            //     });

        } catch (error) {
            console.error('Erreur de vérification du statut de paiement :', error);
            setState((prevState) => ({ ...prevState, error, paymentResult: null }));
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
    };
    const renderResultTable = (result) => (
        <table className="result-table">
            <tbody>
                {Object.entries(result).map(([key, value]) => (
                    <tr key={key} className="result-row">
                        <td className="result-cell">{key}</td>
                        <td className="result-cell">{key === 'data' ? <pre>{JSON.stringify(value, null, 2)}</pre> : JSON.stringify(value)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <Nav />
            <div className="check-payment-status-container">
                <h1>Vérification du Statut de Paiement</h1>
                <div>
                    <p>Transaction ID: {transactionId}</p>
                </div>
                <button onClick={() => handleCheckPaymentStatus(transactionId)} disabled={loading}>
                    Vérifier le paiement
                </button>

                {loading ? <p>Vérification en cours...</p> : null}

                {paymentResult ? (
                    <div>
                        <h2>Résultat du paiement</h2>
                        <pre>
                        
                        {renderResultTable(paymentResult)}
                        </pre>
                    </div>
                ) : null}
                

                {error ? (
                    <div className="error-container">
                        <h2>Erreur de paiement :</h2>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Return;
