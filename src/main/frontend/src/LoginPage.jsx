import React, { useState } from "react";
import HomePage from "./HomePage";

function LoginPage({ goBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
            if (username === "admin" && password === "1234") {
            setLoggedIn(true);
        } else {
            alert("Špatné přihlašovací údaje!");
        }
    };

    if (loggedIn) return <HomePage />;

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={goBack}>⬅ Zpět</button>
            <h2>Přihlášení</h2>

            <form onSubmit={handleLogin}>
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

                <button type="submit">Přihlásit</button>
            </form>
        </div>
    );
}

export default LoginPage;
