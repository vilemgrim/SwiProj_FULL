import React, { useState } from "react";

function RegisterPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
            });

            const result = await response.json();

            if (result === true) {
                alert("Registrace úspěšná!");
                goBack(); // vrátí tě na login nebo menu
            } else {
                alert("Uživatel už existuje!");
            }
        } catch (error) {
            alert("Chyba při komunikaci se serverem");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: "100%", maxWidth: "300px" }}>
                <button onClick={goBack} style={{ marginBottom: "20px", cursor: "pointer" }}>⬅ Zpět</button>
                <h2>Registrace</h2>

                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                        Registrovat
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
