import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // debug
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home">
      <h1>Products</h1>

      <div className="product-grid">
        {products.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.image,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;