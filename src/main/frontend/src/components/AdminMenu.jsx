import React from "react";
import { useNavigate } from "react-router-dom";

function AdminMenu({ username, isAdmin }) {
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

            <button style={menuBtn} onClick={() => navigate("/home")}>
                Hlavní stránka
            </button>

            {isAdmin && (
                <>
                    <button style={menuBtn} onClick={() => navigate("/admin/users")}>
                        Správa uživatelů
                    </button>

                    <button style={menuBtn} onClick={() => navigate("/admin/questions")}>
                        Správa otázek
                    </button>
                </>
            )}

            {username === "root" && (
                <button style={menuBtn} onClick={() => navigate("/admin/system")}>
                    Systémové nastavení
                </button>
            )}
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
