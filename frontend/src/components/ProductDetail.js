import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from "./Nav";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {

        navigate("/login");
        return;
        }

        axios.get(`/api/products/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => setProduct(res.data))
        .catch(err => setError("Greška pri učitavanju proizvoda"));
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!product) return <p>Učitavanje...</p>;

    return (
        
        <div style={{
            width: "100%",
            display:"flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "none"
        }}>
            <Nav />
            <h3 style={{ textAlign: "center"}}>Pregled proizvoda<br />{product.naziv}</h3>
            <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "1200px",
            padding: "20px",
            borderTop: "1px solid rgb(221, 221, 221)",
            borderLeft: "1px solid rgb(221, 221, 221)",
            borderRight: "1px solid rgb(221, 221, 221)",
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 5px",
            
            
          }}>
            <img src={product.imgsrc} alt={product.naziv} style={{ maxWidth: "300px" }} />
            <div> 
                <h1 style={{
                    width: "500px"
                }}>{product.naziv}</h1>
                <p><strong>EAN:</strong> {product.ean || "Nema EAN koda"}</p>
                <p><strong>Na lageru:</strong> {product.stock !== undefined && product.stock !== null && product.stock !== "" && product.stock !== "0"? product.stock : "Trenutno nedostupno"}</p>
                <p><strong>Kategorija:</strong> {product.categoryName}</p>
                <p><strong>Brend:</strong> {product.brandName || "Brend nije naveden"}</p>
                <h2><strong>Cena</strong> {product.price.toFixed(0)} RSD</h2>
            </div>
            

          </div>
          
          <div style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            flexDirection: "column",
            width: "1200px",
            padding: "20px",
            border: "1px solid rgb(221, 221, 221)",
            borderRadius: "8px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 5px",

          }}>
            <h2>Specifikacije</h2>
            <p dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          
        </div>
    );
}