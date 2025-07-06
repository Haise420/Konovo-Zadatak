import React from "react";
import Products from "./Products";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      padding: "10px 50px 10px 50px",
      backgroundColor: "#222",
      color: "white",
      width: "100%",
      gap: "35px",
      boxSizing: "border-box"
    }}>
      <img
        style={{ background: "black", padding: "15px", width: "150px", }}
        alt="konovo_logo"
        src="https://konovo.rs/wp-content/uploads/2023/03/konovo_logo_light.png"
      />

    <button 
       onClick={() => navigate("/products")} 
        style={{
          background: "none",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "23px"
        }}
      >
        Proizvodi
    </button>
      
      <button 
        onClick={handleLogout} 
        style={{
          backgroundColor: "#e63946",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          marginLeft: "auto"
        }}
      >
        Odjavi se
      </button>
    </nav>
  );
}
