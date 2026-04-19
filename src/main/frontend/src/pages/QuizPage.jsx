import React, { useEffect, useState } from "react";

function QuizPage() {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/questions/quiz?quiz=EU_CAPITALS")
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
    }, []);

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

    // 🔥 TADY JE NOVÝ BLOK S TLAČÍTKEM ZPĚT
    if (finished) {
        return (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h2>Kvíz dokončen</h2>
                <p>Skóre: {score} / {questions.length}</p>

                <button
                    onClick={() => window.location.href = "/home"}
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

            {selected !== null && (
                <button
                    onClick={nextQuestion}
                    style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Další otázka
                </button>
            )}
        </div>
    );
}

export default QuizPage;
