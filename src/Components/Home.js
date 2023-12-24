import React from "react";
import Card from "./Card/Card";
import Cart from "./Cart/Cart";
import Nav from "./Nav/Nav";
import { cartItems } from "../db/productSignals";
const { getData } = require("../db/db");
const products = getData();
const telegram = window.Telegram.WebApp;

// ... (importations)

function Home() {

  return (
    <>
      <Nav />
      <Cart cartItems={cartItems} />
      <h1 className="heading">Learn By mistake</h1>
      <div className="cards__container">
        {products.map((product) => (
          <Card
            product={product}
            key={product.id}
          />
        ))}
      </div>
      
    </>
  );
}

export default Home;

