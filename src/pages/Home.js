import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("[frontend] home page product load started", {
          event: "frontend_home_product_load_started",
        });

        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);

        console.log("[frontend] home page product load success", {
          event: "frontend_home_product_load_success",
          product_count: Array.isArray(data) ? data.length : 0,
        });
      } catch (err) {
        const message =
          err?.response?.data?.error || err.message || "Something went wrong";

        setError(message);

        console.error("[frontend] home page product load failed", {
          event: "frontend_home_product_load_failed",
          error_message: message,
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="home">
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.title ?? product.name,
              price: product.price,
              image: product.image,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;