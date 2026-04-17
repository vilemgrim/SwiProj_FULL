import React, { useState } from "react";

function ChangePasswordPage({ goBack }) {
    // Potřebujeme vědět, komu to heslo měníme (pokud ještě nemáte sessions/tokeny)
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // 1. Kontrola prázdných polí
        if (!username || !oldPassword || !newPassword || !confirmNewPassword) {
            alert("Vyplňte prosím všechna pole!");
            return;
        }

        // 2. Kontrola shody nového hesla
        if (newPassword !== confirmNewPassword) {
            alert("❌ Nová hesla se neshodují!");
            return;
        }

        try {
            // Voláme backend (cestu si případně upravte podle vašeho AuthControlleru)
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
                goBack(); // Vrátí uživatele do menu
            } else {
                alert("❌ Změna se nezdařila! Zřejmě jste zadali špatné staré heslo.");
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
                <h2>Změna hesla</h2>

                <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        placeholder="Uživatelské jméno"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: "8px" }}
                    />

                    <input
                        type="password"
                        placeholder="Staré heslo"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        style={{ padding: "8px" }}
                    />

                    <input
                        type="password"
                        placeholder="Nové heslo"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ padding: "8px", marginTop: "10px" }}
                    />

                    <input
                        type="password"
                        placeholder="Potvrďte nové heslo"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        style={{ padding: "8px" }}
                    />

                    <button type="submit" style={{ padding: "10px", marginTop: "10px", cursor: "pointer", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "5px" }}>
                        Změnit heslo
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordPage;