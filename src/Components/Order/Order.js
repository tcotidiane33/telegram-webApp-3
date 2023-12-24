// Components/Order.js
import React from "react";
import { useHistory } from "react-router-dom";
import "./Order.css";
import OrderItem from "./OrderItem";
import { cartItems, calculateTotalPrice } from "../../db/productSignals";
import Nav from "../Nav/Nav";

function Order() {
  const history = useHistory();

  return (
    <div>
      <h1 className="heading">Panier Books</h1>
     
      <Nav />

      <div>
        <h3>Selected Items:</h3>
        <ul>
          {cartItems.value.map(({ id, BookTitle, quantity, price, ImageL }) => (
            <OrderItem
              key={id}
              id={id}
              BookTitle={BookTitle}
              quantity={quantity}
              price={price}
              ImageL={ImageL}
              
            />
          ))}
        </ul>
        <br />
        <span className="bold heading">Total Price: {calculateTotalPrice}</span>
        <br />
        <button className="btn btn-checkout" onClick={() => history.push("/payment")}>
          Passer Votre Commande
        </button>
      </div>
    </div>
  );
}

export default Order;
