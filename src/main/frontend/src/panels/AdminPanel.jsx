import React from "react";

function AdminPanel({ goBack }) {
    return (
        <div style={{ padding: "40px" }}>
            <h2>Admin Panel</h2>

            <ul>
                <li>Správa uživatelů (povýšit na admina)</li>
                <li>Správa otázek</li>
                <li>Statistiky</li>
            </ul>

            <button onClick={goBack}>Zpět</button>
        </div>
    );
}

export default AdminPanel;
