import React, { useState } from "react";
import "../styles/RegisterPage.css";

function RegisterPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            alert("Vyplňte prosím všechna pole!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Hesla se neshodují!");
            return;
        }

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
                goBack(); // Vrátí do menu
            } else {
                alert("Uživatel už existuje!");
            }
        } catch (error) {
            alert("Chyba při komunikaci se serverem");
            console.error(error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">

                <div className="register-back-button">
                    <button onClick={goBack}>⬅ Zpět</button>
                </div>

                <h2 className="register-title">Registrace</h2>

                <form onSubmit={handleRegister} className="register-form-group">
                    <input
                        className="register-input"
                        placeholder="Uživatel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="register-input"
                        type="password"
                        placeholder="Heslo"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        className="register-input"
                        type="password"
                        placeholder="Potvrďte heslo znovu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button type="submit" className="register-button">
                        Registrovat
                    </button>
                </form>
            </div>
        </div>
    );
}
export default RegisterPage;