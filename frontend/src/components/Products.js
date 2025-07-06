import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Greška pri učitavanju proizvoda");
        }
        return response.json();
      })
      .then((res) => {
 
        const uniqueCategories = [...new Set(res.map((p) => p.categoryName).filter(Boolean))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);


  const fetchProducts = (search = "", category = "") => {
    const token = localStorage.getItem("token");
    if (!token) {

      navigate("/login");
      return;
    }

    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    const url = `/api/products/?${query.toString()}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Greška pri učitavanju proizvoda");
        }
        return response.json();
      })
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = () => {
    fetchProducts(searchTerm, selectedCategory);
  };

  if (error) return <p style={{ color: "red" }}>Greška: {error}</p>;
  if (!products) return <p>Učitavanje proizvoda...</p>;

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Proizvodi</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Pretraži po imenu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px", width: "180px" }}
        >
          <option value="">Sve kategorije</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleFilter} style={{ padding: "8px 16px" }}>
          Primeni filter
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 300px)",
          gap: "25px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {products.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>Nema proizvoda za prikaz.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.sif_product}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                cursor: "pointer",
                width: "250px",
              }}
              onClick={() => navigate(`/products/${product.sif_product}/`)}
            >
              <img
                src={product.imgsrc}
                alt={product.naziv}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <h3 style={{ height: "75px", overflow: "hidden" }}>{product.naziv}</h3>
              <p>
                <strong>Cena:</strong> {product.price.toFixed(0)} RSD
              </p>
              <p>
                <strong>EAN:</strong> {product.ean || "Nema EAN kod"}
              </p>
              <p>
                <strong>Dostupno:</strong> {product.stock !== undefined && product.stock !== null && product.stock !== "" && product.stock !== "0"? product.stock : "Trenutno nedostupno"}
              </p>
              <p>
                <strong>Kategorija:</strong> {product.categoryName}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
