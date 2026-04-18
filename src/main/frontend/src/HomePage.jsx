import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage(props) {

    const navigate = useNavigate();

    // Styl tlačítek v pravém panelu
    const btnStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "8px",
        cursor: "pointer",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "#f0f0f0",
        fontSize: "14px"
    };

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

            {/* PRAVÝ PANEL – KOMPAKTNÍ BLOK */}
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    width: "260px",
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.15)"
                }}
            >
                {/* Jméno + role */}
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {props.username}
                    </div>

                    {props.username === "root" ? (
                        <div style={{ fontSize: "14px", color: "purple", fontWeight: "bold" }}>
                            SUPERADMIN
                        </div>
                    ) : props.isAdmin ? (
                        <div style={{ fontSize: "14px", color: "red", fontWeight: "bold" }}>
                            ADMIN
                        </div>
                    ) : null}
                </div>

                {/* Tlačítka */}
                {props.isAdmin && props.username !== "root" && (
                    <>
                        <button
                            onClick={() => navigate("/admin/users")}
                            style={btnStyle}
                        >
                            Správa uživatelů
                        </button>

                        <button
                            onClick={() => navigate("/admin/questions")}
                            style={btnStyle}
                        >
                            Správa otázek
                        </button>
                    </>
                )}

                {props.username === "root" && (
                    <>
                        <button
                            onClick={() => navigate("/admin/users")}
                            style={btnStyle}
                        >
                            Správa uživatelů
                        </button>

                        <button
                            onClick={() => navigate("/admin/questions")}
                            style={btnStyle}
                        >
                            Správa otázek
                        </button>

                        <button
                            onClick={() => navigate("/admin/system")}
                            style={btnStyle}
                        >
                            Systémové nastavení
                        </button>
                    </>
                )}

                {!props.isAdmin && props.username !== "root" && (
                    <button
                        onClick={() => navigate("/user")}
                        style={btnStyle}
                    >
                        Uživatelský panel
                    </button>
                )}
            </div>

            {/* Uvítání */}
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
                Vítej, soudruhu!
            </h1>

            <p style={{ fontSize: "18px", maxWidth: "500px", marginBottom: "30px", color: "#333" }}>
                Komise tvé přihlášení schválila.
                Pokud budeš chtít změnit heslo, vrať se do hlavního menu.
            </p>

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
