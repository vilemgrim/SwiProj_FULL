import React, { useState } from "react";
import "../styles/ChangePasswordPage.css";

function ChangePasswordPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        //Kontrola prázdných polí
        if (!username || !oldPassword || !newPassword || !confirmNewPassword) {
            alert("Vyplňte prosím všechna pole!");
            return;
        }

        //Kontrola shody nového hesla
        if (newPassword !== confirmNewPassword) {
            alert("❌ Nová hesla se neshodují!");
            return;
        }

        try {
            // Voláme backend
            const response = await fetch("http://localhost:8080/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            });

            const result = await response.json();

            if (result === true) {
                alert("✅ Heslo bylo úspěšně změněno!");
                goBack();
            } else {
                alert("❌ Změna se nezdařila! Zřejmě jste zadali špatné staré heslo.");
            }
        } catch (error) {
            alert("Chyba při komunikaci se serverem");
            console.error(error);
        }
    };

    return (
        <div className="change-password-container">
            <div className="change-password-card">

                <div className="change-password-back-button">
                    <button onClick={goBack}>⬅ Zpět</button>
                </div>

                <h2 className="change-password-title">Změna hesla</h2>

                <form onSubmit={handleChangePassword} className="change-password-form-group">
                    <input
                        className="change-password-input"
                        placeholder="Uživatel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        className="change-password-input"
                        type="password"
                        placeholder="Staré heslo"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <input
                        className="change-password-input"
                        type="password"
                        placeholder="Nové heslo"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button type="submit" className="change-password-button">
                        Změnit heslo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;