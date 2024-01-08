import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Cinetpay, checkPayStatus } from '../cinetpay';
import Nav from '../../Nav/Nav';
import sendTelegramNotification from "../sendNotify";
import './CheckPaymentStatus.css';

const Return = ({ handleCheckPaymentStatusProp }) => {
    const [state, setState] = useState({
        transactionId: '',
        paymentResult: null,
        error: null,
        loading: false,
    });

    const { transactionId, paymentResult, error, loading } = state;
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        // Mettre à jour le state avec la transaction_id provenant de l'URL
        setState((prevState) => ({ ...prevState, transactionId: id }));
        // Appeler la fonction de vérification du statut de paiement ici si nécessaire
        handleCheckPaymentStatusProp(history);
    }, [id, handleCheckPaymentStatusProp, history]);

    const handleCheckPaymentStatus = async (history) => {
        try {
            setState((prevState) => ({ ...prevState, loading: true }));
            // Effectuer la vérification du statut de paiement
            const result = await checkPayStatus(transactionId);
            if (result.data.code === '00' && result.data.message === 'SUCCES' && result.data.data) {
                setState((prevState) => ({ ...prevState, paymentResult: result.data, error: null }));
                // Après le traitement du paiement avec CinetPay
                const makeNotify = await Cinetpay.sendNotify(transactionId);
                sendTelegramNotification(makeNotify);
            } else {
                setState((prevState) => ({ ...prevState, error: result, paymentResult: null }));
            }
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
                    {/* Ajoutez ici un bouton ou un lien pour copier la transaction_id si nécessaire */}
                </div>
                <button onClick={() => handleCheckPaymentStatus(history)} disabled={loading}>
                    Vérifier le paiement
                </button>

                {loading ? <p>Vérification en cours...</p> : null}

                {paymentResult ? (
                    <div>
                        <h2>Résultat du paiement</h2>
                        {renderResultTable(paymentResult)}
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
