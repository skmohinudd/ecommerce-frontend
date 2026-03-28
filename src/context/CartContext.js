import React, { createContext, useState } from "react";

// ✅ Named export
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

 const addToCart = (product) => {
  setCart((prevCart) => {
    const exist = prevCart.find((item) => item.id === product.id);

    if (exist) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, qty: 1 }];
    }
  });
};
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};