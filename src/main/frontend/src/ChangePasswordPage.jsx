import React, { useState } from "react";

function ChangePasswordPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        alert("Heslo změněno (zatím bez ukládání)");
        goBack();
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
