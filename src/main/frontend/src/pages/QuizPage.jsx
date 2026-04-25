import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";

function QuizPage() {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const quizType = params.get("type") || "EU_CAPITALS";

    useEffect(() => {
        // Přečteme nastavení z paměti prohlížeče (pokud root nic neměnil, dáme výchozích 10)
        const count = localStorage.getItem("globalQuestionCount") || 10;
        fetch(`http://localhost:8080/api/questions/quiz?quiz=${quizType}&count=${count}`)
            .then(res => {
                if (!res.ok) throw new Error("Backend error");
                return res.json();
            })
            .then(data => {
                setQuestions(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError(true);
                setLoading(false);
            });
    }, [quizType]);

    // Uložení výsledku po dokončení kvízu
    useEffect(() => {
        if (finished && questions.length > 0) {
            fetch("http://localhost:8080/api/results/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: localStorage.getItem("username") || "Anonym",
                    quiz: quizType,
                    score: score,
                    total: questions.length
                })
            }).catch(err => console.error("Chyba při ukládání skóre:", err));
        }
    }, [finished, questions.length, quizType, score]);

    // --- FUNKCE PRO OBSLUHU TLAČÍTEK ---
    const handleAnswer = (option) => {
        setSelected(option);
        if (option === questions[index].correct) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (index + 1 < questions.length) {
            setIndex(index + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    };

    const skipQuestion = () => {
        if (index + 1 < questions.length) {
            setIndex(index + 1);
            setSelected(null);
        } else {
            setFinished(true);
        }
    };

    const endQuiz = () => {
        setFinished(true);
    };

    // --- POMOCNÁ FUNKCE PRO BARVU TLAČÍTEK ---
    const getOptionClassName = (opt) => {
        if (selected === null) return "quiz-option-btn";
        if (opt === questions[index].correct) return "quiz-option-btn correct";
        if (opt === selected) return "quiz-option-btn wrong";
        return "quiz-option-btn";
    };

    // ==========================================
    // VYKRESLOVÁNÍ OBRAZOVKY (RENDER)
    // ==========================================

    if (loading) {
        return (
            <div className="quiz-page-wrapper">
                <div className="quiz-message">⏳ Načítám otázky komise...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-page-wrapper">
                <div className="quiz-container quiz-error">
                    <h2>❌ Chyba při načítání kvízu</h2>
                    <p>Zkontroluj, jestli běží backend na portu 8080.</p>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="quiz-page-wrapper">
                <div className="quiz-container">
                    <h2>📭 Žádné otázky nebyly načteny</h2>
                    <p>Zkontroluj databázi nebo nastavení backendu.</p>
                </div>
            </div>
        );
    }

    // 1. SCÉNÁŘ: Výsledková stránka (Kvíz je hotový)
    if (finished) {
        return (
            <div className="quiz-page-wrapper">
                <div className="quiz-container">
                    <h2 className="quiz-summary-title">🎉 Kvíz dokončen!</h2>
                    <p style={{ fontSize: "18px", color: "#666" }}>Tvé konečné skóre je:</p>

                    <div className="quiz-score-display">
                        {score} / {questions.length}
                    </div>

                    <p style={{ marginBottom: "30px", color: "#777" }}>
                        Výsledek byl úspěšně uložen do databáze.
                    </p>

                    <button className="quiz-home-btn" onClick={() => navigate("/home")}>
                        🏠 Zpět na hlavní stránku
                    </button>
                </div>
            </div>
        );
    }

    // 2. SCÉNÁŘ: Hlavní UI kvízu (Kvíz probíhá)
    const current = questions[index];

    return (
        <div className="quiz-page-wrapper">
            <div className="quiz-container">

                <div className="quiz-counter">
                    Otázka {index + 1} z {questions.length}
                </div>

                <h2 className="quiz-question">{current.question}</h2>

                <div className="quiz-options-grid">
                    {current.options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(opt)}
                            disabled={selected !== null}
                            className={getOptionClassName(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="quiz-actions">
                    {selected !== null && (
                        <button onClick={nextQuestion} className="quiz-action-btn btn-next">
                            Další otázka ➡️
                        </button>
                    )}

                    {selected === null && (
                        <button onClick={skipQuestion} className="quiz-action-btn btn-skip">
                            Přeskočit ⏭️
                        </button>
                    )}

                    <button onClick={endQuiz} className="quiz-action-btn btn-end">
                        ⏹️ Ukončit kvíz
                    </button>
                </div>

            </div>
        </div>
    );
}

export default QuizPage;