import React from "react";
import { useNavigate } from "react-router-dom";

function AdminMenu({ username, isAdmin, logout }) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "260px",
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                fontFamily: "Arial, sans-serif"
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {username}
                </div>

                {username === "root" ? (
                    <div style={{ fontSize: "14px", color: "purple", fontWeight: "bold" }}>
                        SUPERADMIN
                    </div>
                ) : isAdmin ? (
                    <div style={{ fontSize: "14px", color: "red", fontWeight: "bold" }}>
                        ADMIN
                    </div>
                ) : (
                    <div style={{ fontSize: "14px", color: "gray", fontWeight: "bold" }}>
                        UŽIVATEL
                    </div>
                )}
            </div>

            {/* Hlavní stránka */}
            <button style={menuBtn} onClick={() => navigate("/home")}>
                Hlavní stránka
            </button>

            {/* Správa pro adminy */}
            {isAdmin && (
                <>
                    <button style={menuBtn} onClick={() => navigate("/admin/users")}>
                        Správa uživatelů
                    </button>

                    <button style={menuBtn} onClick={() => navigate("/admin/questions")}>
                        Správa otázek
                    </button>

                    {/* Vytvoření kvízu */}
                    <button style={menuBtn} onClick={() => navigate("/create-quiz")}>
                        Vytvořit kvíz
                    </button>
                </>
            )}

            {/* Systémové nastavení pro root */}
            {username === "root" && (
                <button style={menuBtn} onClick={() => navigate("/admin/system")}>
                    Systémové nastavení
                </button>
            )}

            {/* Moje výsledky */}
            <button style={menuBtn} onClick={() => navigate("/my-results")}>
                Moje výsledky
            </button>

            {/* Odhlášení */}
            <button
                onClick={logout}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    background: "#d9534f",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}
            >
                Odhlásit se
            </button>
        </div>
    );
}

const menuBtn = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#f0f0f0",
    fontSize: "14px"
};

export default AdminMenu;
