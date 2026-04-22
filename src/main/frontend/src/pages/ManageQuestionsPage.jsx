import React, { useState, useEffect } from "react";
import AdminMenu from "../components/AdminMenu";

function ManageQuestionsPage({ username, isAdmin, logout }) {
    // Stavy pro formulář
    const [categories, setCategories] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswersInput, setWrongAnswersInput] = useState("");

    // Při načtení stránky se stáhnou všechny kvízy do rozbalovacího menu
    useEffect(() => {
        fetch("http://localhost:8080/api/quizzes")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                // Výchozí kvíz, aby pole nebylo prázdné
                if (data.length > 0) {
                    setSelectedQuiz(data[0].code);
                }
            })
            .catch(err => console.error("Chyba při stahování kategorií:", err));
    }, []);

    // Funkce pro odeslání otázky do Javy
    const handleAddQuestion = async (e) => {
        e.preventDefault();

        if (!questionText || !correctAnswer) {
            alert("⚠️ Vyplňte prosím znění otázky i správnou odpověď.");
            return;
        }

        // Zpracování špatných odpovědí (POKUD JSOU ZADANÉ)
        let wrongAnswersArray = [];
        if (wrongAnswersInput.trim() !== "") {
            wrongAnswersArray = wrongAnswersInput
                .split(",")
                .map(answer => answer.trim())
                .filter(answer => answer !== "");

            // Validace: Pokud něco zadal, musí toho být aspoň 3, aby měl systém z čeho vybírat
            if (wrongAnswersArray.length > 0 && wrongAnswersArray.length < 3) {
                alert("⚠️ Zadejte prosím alespoň 3 špatné odpovědi oddělené čárkou, nebo pole nechte prázdné.");
                return;
            }
        }

        try {
            const response = await fetch("http://localhost:8080/api/questions/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    quiz: selectedQuiz,
                    question: questionText,
                    correct: correctAnswer,
                    wrongAnswers: wrongAnswersArray // <-- Přidáno do odesílání
                }),
            });

            if (response.ok) {
                alert("✅ Otázka byla úspěšně přidána!");
                setQuestionText("");
                setCorrectAnswer("");
                setWrongAnswersInput(""); // Vyčištění nového políčka
            } else {
                alert("❌ Chyba při ukládání na server.");
            }
        } catch (error) {
            console.error("Chyba sítě:", error);
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
                    Správa otázek
                </h2>

                <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <form onSubmit={handleAddQuestion} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                        {/* DYNAMICKÉ ROZBALOVACÍ MENU */}
                        <div>
                            <label><strong>Vyberte kvíz:</strong></label><br/>
                            <select
                                value={selectedQuiz}
                                onChange={(e) => setSelectedQuiz(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.code}>
                                        {cat.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label><strong>Znění otázky:</strong></label><br/>
                            <input
                                type="text"
                                placeholder="Např.: Kde sídlí rektorát Ostravské univerzity?"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                            />
                        </div>

                        <div>
                            <label><strong>Správná odpověď:</strong></label><br/>
                            <input
                                type="text"
                                placeholder="Např.: Na Dvořákově ulici"
                                value={correctAnswer}
                                onChange={(e) => setCorrectAnswer(e.target.value)}
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label><strong>Špatné odpovědi (volitelné, oddělené čárkou):</strong></label><br/>
                            <textarea
                                placeholder="Např.: Fakulta umění, Menza, Koleje"
                                value={wrongAnswersInput}
                                onChange={(e) => setWrongAnswersInput(e.target.value)}
                                rows="3"
                                style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", border: "1px solid #ccc", resize: "vertical" }}
                            />
                            <small style={{ color: "#777", display: "block", marginTop: "4px" }}>
                                Zadejte libovolný počet (min. 3). Pokud necháte prázdné, systém vybere náhodné špatné odpovědi automaticky z jiných otázek.
                            </small>
                        </div>

                        <button type="submit" style={{ padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "10px", fontSize: "16px" }}>
                            ➕ Přidat otázku do databáze
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ManageQuestionsPage;