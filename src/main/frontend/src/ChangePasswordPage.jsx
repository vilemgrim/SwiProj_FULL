import React, { useState } from "react";

function ChangePasswordPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChange = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: username,
                    newPassword: newPassword,
                }),
            });

            const result = await response.json();

            if (result === true) {
                alert("Heslo úspěšně změněno!");
                goBack();
            } else {
                alert("Uživatel neexistuje!");
            }
        } catch (error) {
            alert("Chyba při komunikaci se serverem");
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={goBack}>⬅ Zpět</button>
            <h2>Změna hesla</h2>

            <form onSubmit={handleChange}>
                <input
                    placeholder="Uživatel"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />

                <input
                    type="password"
                    placeholder="Nové heslo"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                /><br /><br />

                <button type="submit">Změnit</button>
            </form>
        </div>
    );
}

export default ChangePasswordPage;

