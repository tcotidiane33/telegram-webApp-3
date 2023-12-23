import React from "react";
import { handleDecrement, handleDelete, handleIncrement } from "../../db/productSignals";
import './Order.css';


function OrderItem({ id, BookTitle, quantity, price, ImageL }) {
  return (
    <div className="order-item-container card-wrap">

      <li className="order-item card">
        <img src={ImageL} alt={BookTitle} className="item-image card-bg" />
        <div className="item-details card-info">
          {/* <span className="item-title">{title}</span> */}
          {/* <span className="item-quantity">Quantity: {quantity}</span> */}
          <div className="item-buttons">
            <button className="btns btn-remove" onClick={() => handleDecrement(id)}>➖</button>
            <strong className="btns">{quantity}</strong>
            <button className="btns btn-add" onClick={() => handleIncrement(id)}>➕</button>
          </div>
          <span className="item-price">Price: {price} XOF</span>
          <button className="btnx" onClick={() => handleDelete(id)}>Remove</button>
        </div>
      </li>
    </div>
  );
}

export default OrderItem;
