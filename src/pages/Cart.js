import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => {
    return acc + item.price * (item.qty || 1);
  }, 0);

  // ✅ FIX: function must be ABOVE return
  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      alert("Order placed successfully!");
      console.log(data);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Backend not connected yet ❌");
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
                {/* Image */}
                <img src={item.image} alt={item.name} />

                {/* Details */}
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Qty: {item.qty}</p>

                {/* Remove button */}
                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="checkout">
            <h2>Total: ₹{total.toFixed(2)}</h2>

            {/* ✅ FIX: connect function */}
            <button onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;