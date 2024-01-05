import React, { useEffect } from 'react';

const Notify = () => {
  useEffect(() => {
    const handleIPN = async () => {
      // Check if there is a CinetPay post value
      if (window.location.search.includes('cpm_trans_id')) {
        // call required lib
        const CinetPay = require('./cinetpay'); // Remplacez par le bon chemin d'accès à votre fichier cinetpay.js

        // sample class for simulate payment validation
        const Commande = require('../Payment'); // Remplacez par le bon chemin d'accès à votre fichier commande.php

        const commande = new Commande();

        try {
          // CinetPay class initialization and transaction identification
          const id_transaction = new URLSearchParams(window.location.search).get('cpm_trans_id');
          const apiKey = '447088687629111c58c3573.70152188';
          const site_id = '911501';
          // platform, use PROD if you created your account in www.cinetpay.com
          // or TEST if you created your account in www.sandbox.cinetpay.com
          const platform = 'PROD';

          // version, use V1 if you want to use API v1
          const version = 'V2';

          const CinetPayInstance = new CinetPay(site_id, apiKey, platform, version);

          // Get correct values for this transaction
          await CinetPayInstance.setTransId(id_transaction).getPayStatus();
          const {
            _cpm_site_id,
            _signature,
            _cpm_amount,
            _cpm_trans_id,
            _cpm_custom,
            _cpm_currency,
            _cpm_payid,
            _cpm_payment_date,
            _cpm_payment_time,
            _cpm_error_message,
            _payment_method,
            _cpm_phone_prefixe,
            _cel_phone_num,
            _cpm_ipn_ack,
            _created_at,
            _updated_at,
            _cpm_result,
            _cpm_trans_status,
            _cpm_designation,
            _buyer_name,
          } = CinetPayInstance;

          // Get actual transaction's status in your DB
          commande.setTransId(id_transaction);
          commande.getCommandeByTransId();

          // Check if the transaction is already validated
          if (commande.getStatut() === '00') {
            // Transaction is already validated, don't do anything
            return;
          }

          // Set new values in the class
          commande.setMethode(_payment_method);
          commande.setPayId(_cpm_payid);
          commande.setBuyerName(_buyer_name);
          commande.setSignature(_signature);
          commande.setPhone(_cel_phone_num);
          commande.setDatePaiement(`${_cpm_payment_date} ${_cpm_payment_time}`);

          // Check if the amount of the transaction corresponds to the amount in our DB
          if (commande.getMontant() === _cpm_amount) {
            // Correct, we continue
            commande.setErrorMessage(_cpm_error_message);
            commande.setStatut(_cpm_result);
            commande.setTransStatus(_cpm_trans_status);

            if (_cpm_result === '00') {
              // Transaction is valid
              // Send mail...
            } else {
              // Transaction is not valid
            }
          } else {
            // Fraud: the amount is not what is expected
            commande.setStatut('-1');
            commande.setTransStatus('REFUSED');
          }

          // Update the transaction in our DB
          commande.update();
        } catch (error) {
          console.error('Erreur :', error.message);
        }
      } else {
        // Direct access to IPN
      }
    };

    handleIPN();
  }, []);

  return <div>IPN Handling...</div>;
};

export default Notify;



// import React, { useEffect, useState } from 'react';
// import {CinetPay} from './cinetpay';
// import { useParams } from 'react-router-dom';

// const Notify = () => {
//   const { transId } = useParams();
//   const [paymentData, setPaymentData] = useState(null);
  
//   const cinetPayInstance = new CinetPay("911501", "447088687629111c58c3573.70152188");
//   cinetPayInstance.displayPayButton("form", 1, "large");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/notify/${transId}`);
//         const data = await response.json();

//         // Traitez les données reçues du serveur, similaire à ce que vous feriez dans notify.php
//         if (data.cpm_result === '00') {
//           // Le paiement est bon
//           // Vérifiez que le montant correspond à la transaction dans votre système
//           // Traitez dans la base de données et délivrez le service au client
//           console.log('Paiement réussi');
//         } else {
//           // Le paiement a échoué
//           console.log('Échec du paiement');
//         }

//         // Mettez à jour le state avec les données
//         setPaymentData(data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des données de notification:', error);
//       }
//     };

//     fetchData();
//   }, [transId]);

//   return (
//     <div>
//       <h1>Page de Notification</h1>
//       {paymentData && (
//         <div>
//           <h2>Données de Paiement</h2>
//           <ul>
//             {Object.entries(paymentData).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {value}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notify;
