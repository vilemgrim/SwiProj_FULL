import React, { useState } from "react";

function LoginPage({ goBack, onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "1234") {
            onLogin();
        } else {
            alert("Špatné přihlašovací údaje!");
        }
    };

    return (
        <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", maxWidth: "300px" }}>
                <button onClick={goBack} style={{ marginBottom: "20px", cursor: "pointer" }}>⬅ Zpět</button>
                <h2>Přihlášení</h2>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        placeholder="Uživatel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: "8px" }}
                    />

                    <input
                        type="password"
                        placeholder="Heslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "8px" }}
                    />

                    <button type="submit" style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}>
                        Přihlásit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;