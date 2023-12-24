import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { Cinetpay } from './cinetpay';

const Notify = () => {
    const [state, setState] = useState({
        transactionId: '',
        paymentResult: null,
        error: null,
        loading: false, // Add loading state
    });

    const { transactionId, paymentResult, error, loading } = state;

    const handleChange = (e) => {
        setState((prevState) => ({ ...prevState, transactionId: e.target.value }));
    };

    const handleCheckPaymentStatus = async (e) => {
        e.preventDefault(); // Prevent the form from submitting

        try {
            setState((prevState) => ({ ...prevState, loading: true }));

            const cinetpayInstance = new Cinetpay({
                apikey: '447088687629111c58c3573.70152188',
                site_id: 911501,
                notify_url: 'https://libraryci.netlify.app/notify',
                return_url: 'https://libraryci.netlify.app',
                lang: 'fr',
            });

            const result = await cinetpayInstance.checkPayStatus(transactionId);

            if (result && result.code === '201' && result.data) {
                setState((prevState) => ({ ...prevState, paymentResult: result.data, error: null }));
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

    return (
        <>
            <Nav />
            <div>
                <h1>Vérification du Statut de Paiement</h1>
                <form onSubmit={handleCheckPaymentStatus}>
                    <label>
                        Transaction ID :
                        <input type="text" value={transactionId} onChange={handleChange} />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Vérification en cours...' : 'Vérifier le Statut de Paiement'}
                    </button>
                </form>
                {paymentResult ? (
                    <div>Résultat du paiement : {JSON.stringify(paymentResult)}</div>
                ) : null}
                {error ? <div>Erreur : {JSON.stringify(error)}</div> : null}
            </div>
        </>
    );
};

export default Notify;
