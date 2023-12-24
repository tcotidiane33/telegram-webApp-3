// App.js
import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Order from "./Components/Order/Order";
import Category from "./Components/Category/Category";
import PaymentForm from "./Components/API/test/PaymentForm";
import Payment from "./Components/API/Payment";
import Notify from "./Components/API/Notify";

const App = () => {

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
        <Route path="/category"  render={(props) => (
            <Category />
          )}  />
        <Route
          path="/paymentForm"
          render={(props) => (
            <PaymentForm />
          )} />
        <Route
          path="/payment"
          render={(props) => (
            <Payment />
          )} />
        <Route
          path="/notify"
          render={(props) => (
            <Notify />
          )} />


      </Switch>
    </BrowserRouter>
  );
};

export default App;
