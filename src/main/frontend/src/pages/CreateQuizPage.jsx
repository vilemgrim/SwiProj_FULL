import React, { useState } from "react";
import AdminMenu from "../components/AdminMenu";
import "../styles/CreateQuizPage.css";

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
        <div className="create-quiz-container">

            {/* PANEL MENU */}
            <div className="create-quiz-menu">
                <AdminMenu username={username} isAdmin={isAdmin} logout={logout} />
            </div>

            {/* OBSAH */}
            <div className="create-quiz-content">
                <h2 className="create-quiz-title">
                    Vytvořit nový kvíz
                </h2>

                <div className="create-quiz-card">
                    <form onSubmit={handleCreateQuiz} className="create-form-group">

                        <div>
                            <label className="create-label">Kód kvízu (např. JAVA_01):</label>
                            <input
                                type="text"
                                className="create-input"
                                placeholder="Zadejte unikátní kód..."
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <small className="create-helper-text">Systém ho sám převede na velká písmena bez mezer.</small>
                        </div>

                        <div>
                            <label className="create-label">Název na kartičce:</label>
                            <input
                                type="text"
                                className="create-input"
                                placeholder="Např.: Základy programování v Javě"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="create-tip">
                            💡 Tip: Aby se kvíz správně zařadil na hlavní stránce, použijte v názvu nebo popisku slovo
                            <b> "zeměpis"</b> (pro geografii) nebo <b>"univerzita"</b> (pro info o OU).
                        </div>

                        <div>
                            <label className="create-label">Popisek:</label>
                            <textarea
                                className="create-textarea"
                                placeholder="Např.: Otestuj si, co víš o objektech a třídách."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="create-submit-btn">
                            ➕ Založit kvíz
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateQuizPage;