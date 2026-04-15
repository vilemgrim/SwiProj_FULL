import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Přihlašovací údaje:", username, password);
    // sem později přidáme volání na backend
  };

  return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5"
      }}>
        <form
            onSubmit={handleSubmit}
            style={{
              padding: "30px",
              borderRadius: "10px",
              backgroundColor: "white",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              width: "300px"
            }}
        >
          <h2 style={{ textAlign: "center" }}>Přihlášení</h2>

          <label>Uživatelské jméno</label>
          <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />

          <label>Heslo</label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
          />

          <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
          >
            Přihlásit se
          </button>
        </form>
      </div>
  );
}

export default App;
