import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { Cinetpay } from './cinetpay';
import './notify.css'

const Notify = () => {
    const [state, setState] = useState({
        transactionId: '',
        paymentResult: null,
        error: null,
        loading: false,
    });

    const { transactionId, paymentResult, error, loading } = state;

    const handleChange = (e) => {
        setState((prevState) => ({ ...prevState, transactionId: e.target.value }));
    };


    const handleCheckPaymentStatus = async (e) => {
        e.preventDefault();

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


    const DownloadReceipt = () => {
        // Créez une nouvelle structure JSON avec tous les résultats possibles
        const receiptContent = JSON.stringify({
            result: paymentResult,
            error: error,
            loading: loading,
        }, null, 2);

        // Créez un Blob et téléchargez le reçu en tant que fichier texte
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'receipt.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
                    <div>
                        <h2>Résultat du paiement</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                            <tbody>
                                {Object.entries(paymentResult).map(([key, value]) => (
                                    <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                                            {key}
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'left' }}>{JSON.stringify(value)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="download-button" onClick={DownloadReceipt}>Télécharger le reçu</button>
                    </div>
                ) : null}
                <br />
                {error ? (
                    <div className="error-container">
                        <h2>Erreur :</h2>
                        <table className="error-table">
                            {Object.entries(error).map(([key, value]) => (

                                <tbody>
                                    <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                                            {key}
                                        </td>
                                        <td style={{ padding: '8px',display: 'flex', textAlign: 'left' }}>{JSON.stringify(value)}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                ) : null}

            </div>
        </>
    );
};

export default Notify;
