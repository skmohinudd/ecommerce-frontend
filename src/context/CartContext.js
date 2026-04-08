import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exist = prevCart.find((item) => item.id === product.id);

      let updatedCart;

      if (exist) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );

        console.log("[frontend] cart quantity increased", {
          event: "frontend_cart_quantity_increased",
          product_id: product.id,
          product_name: product.name,
        });
      } else {
        updatedCart = [...prevCart, { ...product, qty: 1 }];

        console.log("[frontend] product added to cart", {
          event: "frontend_product_added_to_cart",
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
        });
      }

      console.log("[frontend] cart updated", {
        event: "frontend_cart_updated",
        cart_size: updatedCart.length,
        total_quantity: updatedCart.reduce(
          (sum, item) => sum + (item.qty || 1),
          0
        ),
      });

      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => item.id === id);
      const updatedCart = prevCart.filter((item) => item.id !== id);

      console.log("[frontend] product removed from cart", {
        event: "frontend_product_removed_from_cart",
        product_id: removedItem?.id || id,
        product_name: removedItem?.name || null,
      });

      console.log("[frontend] cart updated", {
        event: "frontend_cart_updated",
        cart_size: updatedCart.length,
        total_quantity: updatedCart.reduce(
          (sum, item) => sum + (item.qty || 1),
          0
        ),
      });

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};