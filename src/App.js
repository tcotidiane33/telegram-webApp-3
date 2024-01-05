// App.js
import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Order from "./Components/Order/Order";
import Category from "./Components/Category/Category";
import Check from "./Components/API/Check";
import Payment from "./Components/API/Payment";
import Notify from "./Components/API/exemple/Notify";
import Return from "./Components/API/exemple/Return";

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
        <Route path="/notify/:transId" component={Notify} />
        <Route path="/return/:transId" component={Return} />


      </Switch>
    </BrowserRouter>
  );
};

export default App;
