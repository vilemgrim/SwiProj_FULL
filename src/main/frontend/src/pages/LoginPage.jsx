import React, { useState } from "react";
import "./LoginPage.css"; // Import CSS

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

                const adminFlag = result.admin === true || result.admin === "true";
                localStorage.setItem("username", username);
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
        <div className="login-container"> {/* Hlavní obal */}
            <div className="login-card"> {/* Karta */}

                <div className="login-back-button">
                    <button onClick={goBack}>⬅ Zpět</button>
                </div>

                <h2 className="login-title">Přihlášení</h2>

                <form onSubmit={handleLogin} className="login-form-group">
                    <input
                        className="login-input"
                        placeholder="Uživatel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Heslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="login-button">
                        Přihlásit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;