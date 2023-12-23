import { signal } from "@preact/signals-react";
import { computed } from "@preact/signals-react";
const { getData } = require("../db/db");

export const cartItems = signal([]);

export const onAdd = (productId) => {
  console.log("Called")
  const exist = cartItems.value.find((x) => x.id === productId);
  console.log(exist);

  if (exist) {
    handleIncrement(productId)
  } else {
    const products = getData();
    const product = products.find((x)=> x.id === productId);
    cartItems.value = [...cartItems.value, {...product, quantity : 1}]
  }
};

export const handleIncrement = (productId) => {
  const exist = cartItems.value.find((x) => x.id === productId);
  // if(){

  // }
  cartItems.value = cartItems.value.map((x) =>
    (x.id === productId ? { ...exist, quantity: exist.quantity + 1 } : x)
  )
  console.log(cartItems.value);
}

export const handleDecrement = (productId) => {
  const exist = cartItems.value.find((x) => x.id === productId);
  if(exist){
    if (exist.quantity === 0) {
      cartItems.value = cartItems.value.filter((x) => x.id !== productId)
      return
    }  
    
    
    cartItems.value = cartItems.value.map((x) =>
    x.id === productId ? { ...exist, quantity: exist.quantity - 1 } : x
    )
    

  }
  console.log(cartItems.value);
}

export const handleDelete = (productId) => {
  cartItems.value = cartItems.value.filter((x) => x.id !== productId)
}


export const calculateTotalPrice = computed(() => {
  return cartItems.value.length > 0 ? cartItems.value.map((checkItem) => {
    return checkItem.price * checkItem.quantity
  }).reduce((previous, next) => previous + next) : 0
});
