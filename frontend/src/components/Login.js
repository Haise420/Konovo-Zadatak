import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Neuspešna prijava");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/products");
    } catch (err) {
      setError("Greška pri konekciji sa serverom");
    }
  };

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
      alignItems: "center"


    }}>
      <img style={{ background: "black", padding: "15px", width: "300px", marginTop: "-100px"}} alt="konovo_logo" src="https://konovo.rs/wp-content/uploads/2023/03/konovo_logo_light.png" />
      <h2>Prijava</h2>
      <form onSubmit={handleLogin} style={{
      width: "450px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center"

    }}>
      <div style={{
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      alignItems: "start",
      gap: "5px"

    }}>
        <label>Korisničko ime</label>
        <input
          name="username"
          type="text"
          placeholder="Korisničko ime"
          style={{
            width: "300px",
            padding: "10px"
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div style={{
      display: "flex",
      justifyContent: "start",
      flexDirection: "column",
      alignItems: "start",
      gap: "5px"

    }}>
        <label>Lozinka</label>
        <input
          type="password"
          placeholder="Lozinka"
          style={{
            width: "300px",
            padding: "10px"
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
        
        
        <button style={{
            width: "325px",
            padding: "10px"
          }} type="submit">Prijavi se</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
