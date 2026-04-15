import React, { useState } from "react";

function RegisterPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        alert("Účet vytvořen (zatím bez ukládání)");
        goBack();
    };

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={goBack}>⬅ Zpět</button>
            <h2>Nový účet</h2>

            <form onSubmit={handleRegister}>
                <input
                    placeholder="Uživatel"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br /><br />

                <input
                    type="password"
                    placeholder="Heslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br /><br />

                <button type="submit">Vytvořit</button>
            </form>
        </div>
    );
}

export default RegisterPage;
