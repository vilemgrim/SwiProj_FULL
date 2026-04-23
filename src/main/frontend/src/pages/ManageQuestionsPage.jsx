import React, { useState, useEffect } from "react";
import AdminMenu from "../components/AdminMenu";
import "./ManageQuestionsPage.css";

function ManageQuestionsPage(props) {
    const [activeTab, setActiveTab] = useState("add");
    const [quizzes, setQuizzes] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [quizCode, setQuizCode] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [wrongAnswers, setWrongAnswers] = useState(["", "", ""]);

    const [editingQuestionId, setEditingQuestionId] = useState(null);

    useEffect(() => {
        fetchQuizzes();
        fetchQuestions();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/quizzes");
            const data = await res.json();
            setQuizzes(data);
            if (data.length > 0) setQuizCode(data[0].code);
        } catch (err) { console.error("Chyba načítání kvízů:", err); }
    };

    const fetchQuestions = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/questions");
            const data = await res.json();
            setQuestions(data);
        } catch (err) { console.error("Chyba načítání otázek:", err); }
    };

    const buildQuestionPayload = () => {
        const wrongAnswersList = wrongAnswers.filter(a => a.trim() !== "");
        return {
            quiz: quizCode,
            question: questionText,
            correct: correctAnswer,
            wrongAnswers: wrongAnswersList
        };
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        const payload = buildQuestionPayload();

        if (buildQuestionPayload().wrongAnswers.length > 0 && buildQuestionPayload().wrongAnswers.length < 3) {
            alert("⚠️ Pro manuální režim musíte vyplnit VŠECHNY 3 špatné odpovědi. Pro automatický režim je nechte prázdná.");
            return;
        }
        const normalizedWrongAnswers = payload.wrongAnswers.map(ans => ans.trim().toLowerCase());
        const uniqueWrongAnswers = new Set(normalizedWrongAnswers);

        if (uniqueWrongAnswers.size !== normalizedWrongAnswers.length) {
            alert("⚠️ Špatné odpovědi se nesmí opakovat! Zadejte unikátní možnosti.");
            return;
        }
        if (normalizedWrongAnswers.includes(payload.correct.trim().toLowerCase())) {
            alert("⚠️ Jedna ze špatných odpovědí je shodná se správnou odpovědí!");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/questions/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildQuestionPayload())
            });
            if (res.ok) {
                alert("Otázka přidána!");
                resetForm();
                fetchQuestions();
            }
        } catch (err) { alert("Chyba při ukládání."); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Opravdu chcete tuto otázku smazat?")) return;

        try {
            const res = await fetch(`http://localhost:8080/api/questions/${id}`, { method: "DELETE" });
            if (res.ok) {
                setQuestions(questions.filter(q => q.id !== id));
            } else {
                alert("Chyba při mazání.");
            }
        } catch (err) { alert("Chyba při komunikaci se serverem."); }
    };

    const startEditing = (q) => {
        setEditingQuestionId(q.id);
        setQuizCode(q.quiz || "");
        setQuestionText(q.question || "");
        setCorrectAnswer(q.correct || "");

        if (q.wrongAnswers && q.wrongAnswers.length > 0) {
            setWrongAnswers(q.wrongAnswers);
        } else {
            setWrongAnswers(["", "", ""]);
        }
    };

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        const payload = buildQuestionPayload();
        if (buildQuestionPayload().wrongAnswers.length > 0 && buildQuestionPayload().wrongAnswers.length < 3) {
            alert("⚠️ Pro manuální režim musíte vyplnit VŠECHNY 3 špatné odpovědi. Pro automatický režim je nechte prázdná.");
            return;
        }
        // Převedeme vše na malá písmena a odstraníme mezery na okrajích, aby "Praha" a " praha " byl ten samý duplikát
        const normalizedWrongAnswers = payload.wrongAnswers.map(ans => ans.trim().toLowerCase());
        const uniqueWrongAnswers = new Set(normalizedWrongAnswers);

        if (uniqueWrongAnswers.size !== normalizedWrongAnswers.length) {
            alert("⚠️ Špatné odpovědi se nesmí opakovat! Zadejte unikátní možnosti.");
            return;
        }
        if (normalizedWrongAnswers.includes(payload.correct.trim().toLowerCase())) {
            alert("⚠️ Jedna ze špatných odpovědí je shodná se správnou odpovědí!");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/questions/${editingQuestionId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildQuestionPayload())
            });
            if (res.ok) {
                alert("Otázka upravena!");
                setEditingQuestionId(null);
                resetForm();
                fetchQuestions();
            }
        } catch (err) { alert("Chyba při úpravě."); }
    };

    const resetForm = () => {
        setQuestionText("");
        setCorrectAnswer("");
        setWrongAnswers(["", "", ""]);
    };

    const handleWrongAnswerChange = (index, value) => {
        const newAnswers = [...wrongAnswers];
        newAnswers[index] = value;
        setWrongAnswers(newAnswers);
    };

    const addWrongAnswerField = () => {
        setWrongAnswers([...wrongAnswers, ""]);
    };

    const removeWrongAnswerField = (index) => {
        const newAnswers = wrongAnswers.filter((_, i) => i !== index);
        setWrongAnswers(newAnswers);
    };

    const renderFormFields = () => (
        <>
            <select className="manage-select" value={quizCode} onChange={(e) => setQuizCode(e.target.value)}>
                {quizzes.map(q => <option key={q.code} value={q.code}>{q.title}</option>)}
            </select>
            <input className="manage-input" placeholder="Znění otázky" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
            <input className="manage-input" placeholder="Správná odpověď" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />

            <small className="manage-helper-text">
                Špatné odpovědi (Nechte prázdné pro automatiku, nebo vyplňte alespoň 3):
            </small>

            {wrongAnswers.map((answer, index) => (
                <div key={index} className="manage-answer-row">
                    <input
                        className="manage-input manage-answer-input"
                        placeholder={`Špatná odpověď ${index + 1}`}
                        value={answer}
                        onChange={(e) => handleWrongAnswerChange(index, e.target.value)}
                    />
                    {wrongAnswers.length > 3 && (
                        <button
                            type="button"
                            className="manage-remove-btn"
                            onClick={() => removeWrongAnswerField(index)}
                        >
                            ✖
                        </button>
                    )}
                </div>
            ))}

            <button type="button" className="manage-add-btn" onClick={addWrongAnswerField}>
                ➕ Přidat další špatnou odpověď
            </button>
        </>
    );

    return (
        <div className="manage-container">
            <AdminMenu username={props.username} isAdmin={props.isAdmin} logout={props.logout} />

            <div className="manage-content">
                <h2 className="manage-title">Správa otázek</h2>

                <div className="manage-tabs">
                    <button className={`manage-tab-btn ${activeTab === "add" ? "active" : ""}`} onClick={() => setActiveTab("add")}>
                        📝 Přidat novou
                    </button>
                    <button className={`manage-tab-btn ${activeTab === "list" ? "active" : ""}`} onClick={() => setActiveTab("list")}>
                        ⚙️ Upravit / Smazat
                    </button>
                </div>

                {activeTab === "add" && (
                    <form onSubmit={handleAddQuestion} className="manage-form">
                        {renderFormFields()}
                        <button type="submit" className="manage-submit-btn">➕ Vytvořit otázku</button>
                    </form>
                )}

                {activeTab === "list" && (
                    <div>
                        {questions.length === 0 ? <p style={{textAlign:"center"}}>Žádné otázky v databázi.</p> : null}
                        {questions.map(q => (
                            <div key={q.id} className="question-item">
                                <div>
                                    <span className="question-text">{q.question}</span>
                                    <span className="question-category">{q.quiz}</span>
                                </div>
                                <div className="action-btns">
                                    <button className="edit-btn" onClick={() => startEditing(q)}>Upravit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(q.id)}>Smazat</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editingQuestionId && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="manage-title">Upravit otázku</h3>
                        <form onSubmit={handleUpdateQuestion} className="manage-form">
                            {renderFormFields()}
                            <div className="modal-actions">
                                <button type="submit" className="manage-submit-btn btn-save">💾 Uložit</button>
                                <button type="button" className="manage-submit-btn btn-cancel" onClick={() => { setEditingQuestionId(null); resetForm(); }}>Zrušit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageQuestionsPage;