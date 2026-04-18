import React from "react";

function UserPanel({ goBack }) {
    return (
        <div style={{ padding: "40px" }}>
            <h2>User Panel</h2>
            <p>Zde může běžný uživatel vidět svůj profil nebo spustit kvíz.</p>

            <button onClick={goBack}>Zpět</button>
        </div>
    );
}

export default UserPanel;
