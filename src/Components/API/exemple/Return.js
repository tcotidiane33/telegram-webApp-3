import React, { useState, useEffect } from 'react';
import CinetPay  from './cinetpay';  // Assurez-vous de mettre le bon chemin vers le fichier CinetPay

const Return = () => {
  const [paymentResult, setPaymentResult] = useState(null);
  useEffect(() => {
    const cinetPayInstance = new CinetPay("911501", "447088687629111c58c3573.70152188");
    cinetPayInstance.displayPayButton("form", 1, "large");
  }, []);

  useEffect(() => {
    const handlePaymentResult = async () => {
      if (window.location.search.includes('cpm_trans_id')) {
        const queryParams = new URLSearchParams(window.location.search);
        const id_transaction = queryParams.get('cpm_trans_id');
        
        try {
          const apiKey = '447088687629111c58c3573.70152188';  // Remplacez par votre clé API CinetPay
          const site_id = '911501';  // Remplacez par votre identifiant de site CinetPay
          const plateform = 'TEST';  // Valorisé à PROD si vous êtes en production
          const version = 'V2';  // Valorisé à V1 si vous voulez utiliser la version 1 de l'API

          const CinetPayInstance = new CinetPay(site_id, apiKey, plateform, version);
          await CinetPayInstance.setTransId(id_transaction).getPayStatus();

          const cpm_result = CinetPayInstance._cpm_result;

          setPaymentResult(cpm_result === '00' ? 'Félicitations, votre paiement a été effectué avec succès' : 'Échec, votre paiement a échoué');
        } catch (error) {
          console.error('Erreur :', error.message);
          setPaymentResult('Erreur lors du traitement du paiement');
        }
      } else {
        setPaymentResult('Paramètres de transaction manquants');
      }
    };

    handlePaymentResult();
  }, []);

  return (
    <div>
      <h1>Résultat du paiement</h1>
      {paymentResult && <p>{paymentResult}</p>}
    </div>
  );
};

export default Return;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import CinetPay from './cinetpay';


// const Return = () => {
//   const { transId } = useParams();
//   const [paymentData, setPaymentData] = useState(null);

//   // const cinetPayInstance = new CinetPay("911501", "447088687629111c58c3573.70152188");
//   // cinetPayInstance.displayPayButton("form", 1, "large");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/return/${transId}`);
//         const data = await response.json();

//         // Traitez les données reçues du serveur, similaire à ce que vous feriez dans return.php
//         if (data.cpm_result === '00') {
//           // Une page HTML de paiement bon
//           console.log('Félicitations, votre paiement a été effectué avec succès');
//         } else {
//           // Une page HTML de paiement échoué
//           console.log('Échec, votre paiement a échoué');
//         }

//         // Mettez à jour le state avec les données
//         setPaymentData(data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des données de retour:', error);
//       }
//     };

//     fetchData();
//   }, [transId]);

//   return (
//     <div>
//       <h1>Page de Retour</h1>
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

// export default Return;
