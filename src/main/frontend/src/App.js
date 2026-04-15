import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ChangePasswordPage from "./ChangePasswordPage";
import HomePage from "./HomePage";

function App() {
    const [page, setPage] = useState("menu"); // menu | login | register | change | home

    // Funkce pro odhlášení
    const logout = () => {
        setPage("menu");
    };

    // Přepínání mezi stránkami
    if (page === "login") return <LoginPage goBack={() => setPage("menu")} onLogin={() => setPage("home")} />;
    if (page === "register") return <RegisterPage goBack={() => setPage("menu")} />;
    if (page === "change") return <ChangePasswordPage goBack={() => setPage("menu")} />;
    if (page === "home") return <HomePage logout={logout} />;

    // Hlavní menu s ikonkami
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            flexDirection: "column"
        }}>
            <h1>Správa účtu</h1>

            <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>

                {/* LOGIN */}
                <div
                    onClick={() => setPage("login")}
                    style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        flexDirection: "column"
                    }}
                >
                    <span style={{ fontSize: "40px" }}>🔑</span>
                    <p>Přihlášení</p>
                </div>

                {/* REGISTER */}
                <div
                    onClick={() => setPage("register")}
                    style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        flexDirection: "column"
                    }}
                >
                    <span style={{ fontSize: "40px" }}>➕</span>
                    <p>Nový účet</p>
                </div>

                {/* CHANGE PASSWORD */}
                <div
                    onClick={() => setPage("change")}
                    style={{
                        width: "120px",
                        height: "120px",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        flexDirection: "column"
                    }}
                >
                    <span style={{ fontSize: "40px" }}>🔄</span>
                    <p>Změna hesla</p>
                </div>

            </div>
        </div>
    );
}

export default App;
