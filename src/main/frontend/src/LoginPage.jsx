import React, { useState } from "react";

function LoginPage({ goBack, onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login-info", {
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

            if (result.success === true) {
                alert("Přihlášení úspěšné!");

                // 🔥 OPRAVA: bezpečné převedení admin flagu
                const adminFlag = result.admin === true || result.admin === "true";

                onLogin(username, adminFlag);

            } else {
                alert("Špatné přihlašovací údaje!");
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
