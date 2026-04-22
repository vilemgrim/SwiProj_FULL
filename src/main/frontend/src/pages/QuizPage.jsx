import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if (finished) {
            fetch("http://localhost:8080/api/results/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: localStorage.getItem("username"),
                    quiz: quizType,
                    score: score,
                    total: questions.length
                })
            });
        }
    }, [finished]);

    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "40px" }}>Načítám otázky...</div>;
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
                <h2>Chyba při načítání kvízu</h2>
                <p>Zkontroluj, jestli běží backend na portu 8080.</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h2>Žádné otázky nebyly načteny</h2>
                <p>Zkontroluj databázi nebo backend.</p>
            </div>
        );
    }

    const current = questions[index];

    const handleAnswer = (option) => {
        setSelected(option);
        if (option === current.correct) {
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

    // Výsledková stránka
    if (finished) {
        return (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h2>Kvíz dokončen</h2>
                <p>Skóre: {score} / {questions.length}</p>

                <button
                    onClick={() => navigate("/home")}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Zpět na hlavní stránku
                </button>
            </div>
        );
    }

    // Hlavní UI kvízu
    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
            <h2>Otázka {index + 1} / {questions.length}</h2>
            <p style={{ fontSize: "20px", marginBottom: "20px" }}>{current.question}</p>

            {current.options.map((opt, i) => (
                <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    disabled={selected !== null}
                    style={{
                        width: "100%",
                        padding: "12px",
                        margin: "8px 0",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        cursor: selected === null ? "pointer" : "default",
                        background:
                            selected === null
                                ? "white"
                                : opt === current.correct
                                    ? "#b6f7b0"
                                    : opt === selected
                                        ? "#ffb3b3"
                                        : "white"
                    }}
                >
                    {opt}
                </button>
            ))}

            <div style={{ marginTop: "20px" }}>
                {selected !== null && (
                    <button
                        onClick={nextQuestion}
                        style={{
                            padding: "10px 20px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            marginRight: "10px"
                        }}
                    >
                        Další otázka
                    </button>
                )}

                <button
                    onClick={skipQuestion}
                    style={{
                        padding: "10px 20px",
                        background: "#ffc107",
                        color: "black",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}
                >
                    Přeskočit
                </button>

                <button
                    onClick={endQuiz}
                    style={{
                        padding: "10px 20px",
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Ukončit kvíz
                </button>
            </div>
        </div>
    );
}

export default QuizPage;
