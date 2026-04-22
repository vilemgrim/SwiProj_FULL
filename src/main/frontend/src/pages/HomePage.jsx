import React, { useState, useEffect } from "react"; // PŘIDÁNO: useState a useEffect
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";

function HomePage(props) {
    const navigate = useNavigate();

    // 1. ZMĚNA: Prázdná krabička na kvízy, kterou naplníme z databáze
    const [quizzes, setQuizzes] = useState([]);

    // 2. ZMĚNA: Automatické stažení dat hned po načtení stránky
    useEffect(() => {
        fetch("http://localhost:8080/api/quizzes")
            .then(res => res.json())
            .then(data => {
                // Uložíme data z Javy do našeho React stavu
                setQuizzes(data);
            })
            .catch(err => console.error("Chyba při načítání kvízů:", err));
    }, []); // Prázdné pole znamená "spusť to jen jednou při načtení"

    const startQuiz = (quizCode) => {
        navigate(`/quiz?type=${quizCode}`);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#e8f0fe",
                padding: "20px",
                position: "relative"
            }}
        >
            {/* ADMIN MENU – včetně logout */}
            <AdminMenu
                username={props.username}
                isAdmin={props.isAdmin}
                logout={props.logout}
            />

            {/* Uvítání */}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
                    Vítej, soudruhu!
                </h1>

                <p style={{
                    fontSize: "18px",
                    maxWidth: "600px",
                    margin: "0 auto 40px auto",
                    color: "#333"
                }}>
                    Komise tvé přihlášení schválila.
                    Vyber si kvíz a ukaž, co v tobě je.
                </p>
            </div>

            {/* GRID KARTIČEK S KVÍZY */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "20px",
                    maxWidth: "1000px",
                    margin: "0 auto"
                }}
            >
                {/* 3. ZMĚNA: React teď projíždí to pole, co přišlo z Javy */}
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id} // Použije se databázové ID jako unikátní klíč
                        style={{
                            padding: "20px",
                            borderRadius: "10px",
                            background: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            textAlign: "center",
                            transition: "0.2s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <h2 style={{ marginBottom: "10px" }}>{quiz.title}</h2>
                        <p style={{ minHeight: "50px", color: "#555" }}>{quiz.description}</p>

                        <button
                            // POZOR: Zde posíláme quiz.code (např. "EU_CAPITALS"), protože v Javě jsme to tak pojmenovali
                            onClick={() => startQuiz(quiz.code)}
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                background: "#0275d8",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Spustit kvíz
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;