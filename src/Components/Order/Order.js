// Components/Order.js
import React from "react";
import { useHistory } from "react-router-dom";
import "./Order.css";
import OrderItem from "./OrderItem";
// import { computed } from "@preact/signals-react";
import { cartItems, calculateTotalPrice } from "../../db/productSignals";
import Nav from "../Nav/Nav";

function Order() {
  const history = useHistory();

  // const calculateTotalPrice = computed(() => {
  //   return cartItems.value.length > 0 ? cartItems.value.map((checkItem) => {
  //     return checkItem.price * checkItem.quantity
  //   }).reduce((previous, next) => previous + next) : 0
  // });

  return (
    <div>
      <h1 className="heading">Panier Books</h1>
      <button className="btn btn-checkout" onClick={() => history.push("/paymentForm")}>
        Passer Votre Commande
      </button>
      <br />
      <br />
      <Nav />

      <div>
        <h3>Selected Items:</h3>
        <ul>
          {cartItems.value.map(({ id, BookTitle, quantity, price, ImageL }) => (
            <OrderItem
              key={id}
              id={id}
              title={BookTitle}
              quantity={quantity}
              price={price}
              Image={ImageL}

            />
          ))}
        </ul>
        <br />
        <span className="bold heading">Total Price: {calculateTotalPrice}</span>
        <br />




      </div>
    </div>
  );
}

export default Order;
