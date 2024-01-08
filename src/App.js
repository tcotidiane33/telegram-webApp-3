// App.js
import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Components/Home";
import Order from "./Components/Order/Order";
import Category from "./Components/Category/Category";
import Check from "./Components/API/Check";
import Payment from "./Components/API/Payment";
import Notify from "./Components/API/exemple/Notify";
import Return from "./Components/API/exemple/Return";

const App = () => {
  const history = useHistory();
  const handleCheckPaymentStatusProp = async (history) => {
    // try {
    //   // Effectuez ici les opérations nécessaires pour vérifier le statut de paiement
    //   // Par exemple, vous pourriez faire une requête à votre serveur pour effectuer la vérification côté serveur.
  
    //   // Simulons une attente pour montrer que cela pourrait être une opération asynchrone
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
  
    //   // Une fois la vérification effectuée avec succès, vous pouvez rediriger l'utilisateur vers une autre page
    //   // Vous pouvez également mettre à jour l'état local du composant si nécessaire
  
    //   // Exemple de redirection
    //   history.push("/payment-success");
    // } catch (error) {
    //   console.error("Erreur lors de la vérification du statut de paiement :", error);
  
    //   // Gérez les erreurs ici, vous pouvez également rediriger l'utilisateur vers une page d'erreur si nécessaire
    //   history.push("/payment-error");
    // }
  };
    
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/order"
          render={(props) => (
            <Order />
          )}
        />
        <Route path="/category" exact component={Category} />

        <Route
          path="/check"
          render={(props) => (
            <Check />
          )} />

        <Route
          path="/payment"
          render={(props) => (
            <Payment />
          )} />
        <Route path="/check" exact component={Check} />
        <Route path="/notify" component={Notify} />
        <Route
          path="/return"
          render={(props) => (
            <Return {...props} handleCheckPaymentStatusProp={handleCheckPaymentStatusProp} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
