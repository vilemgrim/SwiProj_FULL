import React, { useState } from "react";
import AdminMenu from "../components/AdminMenu";

function CreateQuizPage({ username, isAdmin, logout }) {
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateQuiz = async (e) => {
        e.preventDefault();

        if (!code || !title || !description) {
            alert("⚠️ Vyplňte prosím všechna políčka.");
            return;
        }

        // Automatický převod kódu na velká písmena bez mezer (např. "moje java" -> "MOJE_JAVA")
        const formattedCode = code.trim().toUpperCase().replace(/\s+/g, '_');

        try {
            const response = await fetch("http://localhost:8080/api/quizzes/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: formattedCode,
                    title: title,
                    description: description
                }),
            });

            if (response.ok) {
                alert(`✅ Kvíz "${title}" byl úspěšně vytvořen!`);
                // Vyčistíme formulář
                setCode("");
                setTitle("");
                setDescription("");
            } else {
                alert("❌ Chyba! Možná už kvíz s tímto kódem existuje.");
            }
        } catch (error) {
            console.error(error);
            alert("Nelze se spojit se serverem.");
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fb", padding: "20px", display: "flex", flexDirection: "row" }}>

            {/* PANEL VPRAVO */}
            <div style={{ flexShrink: 0 }}>
                <AdminMenu username={username} isAdmin={isAdmin} logout={logout} />
            </div>

            {/* OBSAH VLEVO */}
            <div style={{ flexGrow: 1, marginLeft: "40px", maxWidth: "600px" }}>
                <h2 style={{ marginBottom: "20px", fontWeight: "600", color: "#333" }}>
                    Vytvořit nový kvíz
                </h2>

                <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <form onSubmit={handleCreateQuiz} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                        <div>
                            <label><strong>Kód kvízu (např. JAVA_01):</strong></label><br/>
                            <input
                                type="text"
                                placeholder="Zadejte unikátní kód..."
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                            />
                            <small style={{ color: "#777" }}>Systém ho sám převede na velká písmena.</small>
                        </div>

                        <div>
                            <label><strong>Název na kartičce:</strong></label><br/>
                            <input
                                type="text"
                                placeholder="Např.: Základy programování v Javě"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                            />
                        </div>

                        <div>
                            <label><strong>Popisek:</strong></label><br/>
                            <textarea
                                placeholder="Např.: Otestuj si, co víš o objektech a třídách."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
                            />
                        </div>

                        <button type="submit" style={{ padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "10px", fontSize: "16px" }}>
                            ➕ Založit kvíz
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateQuizPage;