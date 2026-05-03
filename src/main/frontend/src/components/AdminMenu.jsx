import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminMenu.css";

function AdminMenu({ username, isAdmin, logout }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="admin-menu-container">

            <button className="hamburger-btn" onClick={toggleMenu}>
                {isOpen ? "✖ Zavřít" : "☰ Menu"}
            </button>

            <div className={`admin-menu-content ${isOpen ? "open" : ""}`}>
                <div className="admin-menu-header">
                    <div style={{ fontSize: "16px", color: "#333" }}><strong>{username}</strong></div>
                    {isAdmin && <div className="admin-role">SUPERADMIN</div>}
                </div>

                <div className="admin-menu-buttons">
                    <button onClick={() => navigate("/home")}>🏠 Hlavní stránka</button>

                    {isAdmin && (
                        <>
                            <button onClick={() => navigate("/admin/users")}>👥 Správa uživatelů</button>
                            <button onClick={() => navigate("/admin/questions")}>📝 Správa otázek</button>
                            <button onClick={() => navigate("/create-quiz")}>➕ Vytvořit kvíz</button>
                            <button onClick={() => navigate("/admin/system")}>⚙️ Systémové nastavení</button>
                        </>
                    )}

                    <button onClick={() => navigate("/my-results")}>📊 Moje výsledky</button>
                    <button className="logout-btn" onClick={logout}>🚪 Odhlásit se</button>
                </div>
            </div>

        </div>
    );
}

export default AdminMenu;
