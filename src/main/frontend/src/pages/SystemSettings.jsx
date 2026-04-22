import React, { useState, useEffect } from "react";
import AdminMenu from "../components/AdminMenu";

function SystemSettingsPage({ username, isAdmin, logout }) {
    // Stavy pro nastavení (načítáme z localStorage, nebo použije výchozí)
    const [questionCount, setQuestionCount] = useState(
        localStorage.getItem("globalQuestionCount") || 10
    );
    const [maintenanceMode, setMaintenanceMode] = useState(
        localStorage.getItem("maintenanceMode") === "true"
    );

    // Funkce pro uložení změn
    const handleSave = (e) => {
        e.preventDefault();

        // Uložení do prohlížeče
        localStorage.setItem("globalQuestionCount", questionCount);
        localStorage.setItem("maintenanceMode", maintenanceMode);

        alert("✅ Systémová nastavení byla úspěšně uložena!");
    };

    if (username !== "root") {
        return (
            <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
                <h2>⛔ Přístup odepřen</h2>
                <p>Tato stránka je určena pouze pro hlavního administrátora.</p>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fb", padding: "20px", display: "flex" }}>

            <div style={{ flexShrink: 0 }}>
                <AdminMenu username={username} isAdmin={isAdmin} logout={logout} />
            </div>

            <div style={{ flexGrow: 1, marginLeft: "40px", maxWidth: "600px" }}>
                <h2 style={{ marginBottom: "20px", color: "#333" }}>⚙️ Systémová nastavení</h2>

                <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>

                    <p style={{ color: "#777", marginBottom: "20px" }}>
                        Zde můžete provádět globální změny v chování aplikace.
                    </p>

                    <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                        {/* NASTAVENÍ: Počet otázek */}
                        <div>
                            <label><strong>Výchozí počet otázek v kvízu:</strong></label><br/>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                            />
                            <small style={{ color: "#777" }}>Určuje, kolik otázek se hráči vygeneruje při spuštění hry.</small>
                        </div>

                        {/* NASTAVENÍ: Údržba */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#fff3cd", padding: "15px", borderRadius: "5px", border: "1px solid #ffeeba" }}>
                            <input
                                type="checkbox"
                                id="maintenance"
                                checked={maintenanceMode}
                                onChange={(e) => setMaintenanceMode(e.target.checked)}
                                style={{ transform: "scale(1.5)" }}
                            />
                            <label htmlFor="maintenance" style={{ color: "#856404", fontWeight: "bold", cursor: "pointer" }}>
                                Zapnout režim údržby
                            </label>
                        </div>

                        <button type="submit" style={{ padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
                            💾 Uložit nastavení
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default SystemSettingsPage;