import React from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";

function HomePage(props) {

    const navigate = useNavigate();

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#e8f0fe",
                textAlign: "center",
                padding: "20px",
                position: "relative"
            }}
        >

            {/* 🔥 JEDNOTNÉ ADMIN MENU */}
            <AdminMenu username={props.username} isAdmin={props.isAdmin} />

            {/* Uvítání */}
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
                Vítej, soudruhu!
            </h1>

            <p style={{ fontSize: "18px", maxWidth: "500px", marginBottom: "30px", color: "#333" }}>
                Komise tvé přihlášení schválila.
                Pokud budeš chtít změnit heslo, vrať se do hlavního menu.
            </p>

            {/* 🔥 NOVÉ TLAČÍTKO – SPUSTIT KVÍZ */}
            <button
                onClick={() => navigate("/quiz")}
                style={{
                    padding: "12px 24px",
                    cursor: "pointer",
                    background: "#0275d8",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    marginBottom: "20px",
                    transition: "0.2s"
                }}
                onMouseOver={(e) => (e.target.style.background = "#025aa5")}
                onMouseOut={(e) => (e.target.style.background = "#0275d8")}
            >
                Spustit kvíz
            </button>

            {/* Odhlášení */}
            <button
                onClick={() => props.logout()}
                style={{
                    padding: "12px 24px",
                    cursor: "pointer",
                    background: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    transition: "0.2s"
                }}
                onMouseOver={(e) => (e.target.style.background = "#c9302c")}
                onMouseOut={(e) => (e.target.style.background = "#d9534f")}
            >
                Odhlásit se
            </button>
        </div>
    );
}

export default HomePage;
