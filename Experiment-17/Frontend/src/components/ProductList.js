import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ background: "#222", color: "#fff", padding: "40px 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Product List</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        {products.map((p, i) => (
          <div
            key={i}
            style={{
              background: "#333",
              padding: "20px",
              borderRadius: "10px",
              width: "180px",
              textAlign: "center",
              border: "1px solid #444",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#fff" }}>{p.name}</h3>
            <p style={{ marginBottom: "15px" }}>Price: ₹{p.price}</p>
            <button
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
