import React from "react";

function SuperAdminPanel({ goBack }) {
    return (
        <div style={{ padding: "40px" }}>
            <h2>Superadmin Panel</h2>

            <ul>
                <li>Správa uživatelů (povýšit / odebrat admina)</li>
                <li>Správa otázek</li>
                <li>Statistiky</li>
                <li>Možnost mazat uživatele</li>
            </ul>

            <button onClick={goBack}>Zpět</button>
        </div>
    );
}

export default SuperAdminPanel;
