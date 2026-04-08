import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => {
    return acc + item.price * (item.qty || 1);
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => {
    return acc + (item.qty || 1);
  }, 0);

  const handleCheckout = async () => {
    try {
      console.log("[frontend] checkout clicked", {
        event: "frontend_checkout_clicked",
        item_count: cart.length,
        total_quantity: totalQuantity,
        total_amount: total,
      });

      const data = await createOrder({ cart });

      console.log("[frontend] checkout success", {
        event: "frontend_checkout_success",
        item_count: cart.length,
        total_quantity: totalQuantity,
        total_amount: total,
        order_id: data?.order?._id || null,
      });

      alert("Order placed successfully!");
      console.log(data);
    } catch (err) {
      console.error("[frontend] checkout failed", {
        event: "frontend_checkout_failed",
        item_count: cart.length,
        total_quantity: totalQuantity,
        total_amount: total,
        error_message: err?.response?.data?.error || err.message,
      });

      alert(`Checkout failed: ${err?.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="cart-container">
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <h2 className="empty">Cart is empty</h2>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Qty: {item.qty}</p>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="checkout">
            <h2>Total: ₹{total.toFixed(2)}</h2>

            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;