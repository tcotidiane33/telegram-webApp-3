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
                notify_url: 'https://telegram-web-app-3.vercel.app/notify',
                return_url: 'https://telegram-web-app-3.vercel.app',
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
    const renderResultTable = (result) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <tbody>
                {Object.entries(result).map(([key, value]) => (
                    <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                            {key}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'left' }}>
                            {key === 'data' ? (
                                <pre>{JSON.stringify(value, null, 2)}</pre>
                            ) : (
                                JSON.stringify(value)
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    const renderMessage = () => {
        if (paymentResult && paymentResult.data) {
            const { message } = paymentResult.data;

            let displayMessage;
            let messageType;

            switch (message) {
                case '00':
                    displayMessage = 'Opération effectuée avec succès';
                    messageType = 'success';
                    break;
                case '-1':
                    displayMessage = 'Des erreurs dans l’exécution de la requête';
                    messageType = 'error';
                    break;
                case '701':
                    displayMessage = 'Paramètres d’authentification incorrects';
                    messageType = 'error';
                    break;
                case '702':
                    displayMessage = 'Impossible de générer le token';
                    messageType = 'error';
                    break;
                case '703':
                    displayMessage = 'Le compte marchand est invalide';
                    messageType = 'error';
                    break;
                case '704':
                    displayMessage = 'Les paramètres envoyés ne sont pas corrects';
                    messageType = 'error';
                    break;
                case '705':
                    displayMessage = 'Le token a expiré';
                    messageType = 'error';
                    break;
                case '706':
                    displayMessage = 'Le token est invalide';
                    messageType = 'error';
                    break;
                case '707':
                    displayMessage = 'Vous devez générer un autre token';
                    messageType = 'error';
                    break;
                case '708':
                    displayMessage = 'Vous n’êtes pas autorisé à visiter le lien';
                    messageType = 'error';
                    break;
                case '709':
                    displayMessage = 'Des erreurs dans l’exécution de la requête';
                    messageType = 'error';
                    break;
                case '710':
                    displayMessage = 'Des erreurs dans l’exécution de la requête';
                    messageType = 'error';
                    break;
                case '715':
                    displayMessage = 'Une erreur inconnue est survenue';
                    messageType = 'error';
                    break;
                case '716':
                    displayMessage = 'Une donnée émise est incorrecte';
                    messageType = 'error';
                    break;
                case '717':
                    displayMessage = 'Le numéro de téléphone ne correspond pas à un compte particulier CinetPay';
                    messageType = 'error';
                    break;
                case '718':
                    displayMessage = 'Le JSON émis comporte des erreurs';
                    messageType = 'error';
                    break;
                case '719':
                    displayMessage = 'Le montant doit être supérieur à 200 XOF';
                    messageType = 'error';
                    break;
                case '720':
                    displayMessage = 'Le montant doit être inférieur à 1500000 XOF';
                    messageType = 'error';
                    break;
                case '721':
                    displayMessage = 'L’opérateur n’est pas pris en charge par CinetPay';
                    messageType = 'error';
                    break;
                case '602':
                    displayMessage = 'Votre solde CinetPay transfert est insuffisant pour effectuer cette opération';
                    messageType = 'error';
                    break;
                case '723':
                    displayMessage = 'Aucun résultat pour cette recherche';
                    messageType = 'error';
                    break;
                case '724':
                    displayMessage = 'Le numéro de téléphone n’existe pas dans la liste de vos contacts CinetPay';
                    messageType = 'error';
                    break;
                case '725':
                    displayMessage = 'Vous devez mentionner une URL de notification valide';
                    messageType = 'error';
                    break;
                case '801':
                    displayMessage = 'Le montant renseigné est invalide';
                    messageType = 'error';
                    break;
                case '802':
                    displayMessage = 'Le numéro de téléphone renseigné est invalide';
                    messageType = 'error';
                    break;
                case '804':
                    displayMessage = 'L’opérateur n’est pas encore pris en charge par CinetPay';
                    messageType = 'error';
                    break;
                case '805':
                    displayMessage = 'Votre identifiant transaction existe déjà sur CinetPay';
                    messageType = 'error';
                    break;
                default:
                    displayMessage = 'Message non traité';
                    messageType = 'info';
                    break;
            }
            // Affichez le message avec la couleur correspondante
            return (
                <div style={{ color: messageType === 'error' ? 'red' : 'green' }}>
                    <p>{displayMessage}</p>
                    {messageType === 'error' && <p>Transaction échouée! 😞</p>}
                    {/* Ajoutez ici tout autre contenu que vous souhaitez afficher en fonction du type de message */}
                </div>
            );
        }

        // Affichez un message par défaut si paymentResult ou paymentResult.data n'est pas défini
        return <p>Aucun résultat à afficher pour le moment.</p>;
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
                <button type="submit" disabled={loading}>Check</button>
            </form>

            {loading ? <p>Vérification en cours...</p> : null}

            {paymentResult ? (
                <div>
                    {renderMessage()}
                    <h2>Résultat du paiement</h2>
                    {renderResultTable(paymentResult)}
                    <button className="download-button" onClick={DownloadReceipt}>Télécharger le reçu</button>
                </div>
            ) : null}

            {error ? (
                <div className="error-container">
                    <h2>STATUS :</h2>
                    <table className="error-table">
                        {Object.entries(error).map(([key, value]) => (
                            <tbody key={key}>
                                <tr style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
                                        {key}
                                    </td>
                                    <td style={{ padding: '8px', display: 'flex', textAlign: 'left' }}>
                                        {JSON.stringify(value)}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            ) : null}
            
        </div >
        </>
    );
};

export default Notify;



//     return (
//         <>
//             <Nav />
//             <div>
//                 <h1>Vérification du Statut de Paiement</h1>
//                 <form onSubmit={handleCheckPaymentStatus}>
//                     <label>
                    //     Transaction ID :
                    //     <input type="text" value={transactionId} onChange={handleChange} />
                    // </label>
                    // <button type="submit" disabled={loading}>Check</button>
//                 </form>

//                 {loading ? <p>Vérification en cours...</p> : null}

//                 {paymentResult ? (
//                     <div>
//                         <h2>Résultat du paiement</h2>
//                         {renderResultTable(paymentResult)}
//                         <button className="download-button" onClick={DownloadReceipt}>Télécharger le reçu</button>
//                     </div>
//                 ) : null}

//                 {error ? (
//                     <div className="error-container">
//                         <h2>STATUS :</h2>
//                         <table className="error-table">
//                             {Object.entries(error).map(([key, value]) => (
//                                 <tbody key={key}>
//                                     <tr style={{ borderBottom: '1px solid #ddd' }}>
//                                         <td style={{ padding: '8px', textAlign: 'left', fontWeight: 'bold' }}>
//                                             {key}
//                                         </td>
//                                         <td style={{ padding: '8px', display: 'flex', textAlign: 'left' }}>
//                                             {JSON.stringify(value)}
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             ))}
//                         </table>
//                     </div>
//                 ) : null}
//             </div>
//         </>
//     );
// };

// export default Notify;
