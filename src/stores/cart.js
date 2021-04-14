import { writable, derived } from "svelte/store";
import localCart from "../localCart";

// cart
const cart = writable([...localCart]);

// cart total

// local functions
const remove = (id, items) => {
  return items.filter((item) => item.id != id);
};

const toggleAmount = (id, items, action) => {
  return items.map((item) => {
    let newAmount;
    if (action === "inc") {
      newAmount = item.amount + 1;
    } else if (action === "dec") {
      newAmount = item.amount - 1;
    } else {
      newAmount = item.amount;
    }
    return item.id === id ? { ...item, amount: newAmount } : { ...item };
  });
};

// global functions
export const removeItem = (id) => {
  cart.update((storeValue) => {
    return remove(id, storeValue);
  });
};

export const increaseAmount = (id) => {
  cart.update((storeValue) => {
    return toggleAmount(id, storeValue, "inc");
  });
};

export const decreaseAmount = (id) => {
  cart.update((storeValue) => {
    let item = storeValue.find((item) => item.id === id);
    let cart;
    if (item.amount === 1) {
      cart = remove(id, storeValue);
    } else {
      cart = toggleAmount(id, storeValue, "dec");
    }
    return [...cart];
  });
};

// local storage

export const cartTotal = derived(cart, ($cart) => {
  let total = $cart.reduce((acc, curr) => {
    return (acc += curr.amount * curr.price);
  }, 0);
  return total.toFixed(2);
});

export const addToCart = (product) => {
  cart.update((storeValue) => {
    const { id, image, title, price } = product;
    let item = storeValue.find((item) => item.id === id);
    let cart;
    if (item) {
      cart = toggleAmount(id, storeValue, "inc");
    } else {
      let newItem = { id, image, title, price, amount: 1 };
      cart = [...storeValue, newItem];
    }
    return cart;
  });
};
export default cart;