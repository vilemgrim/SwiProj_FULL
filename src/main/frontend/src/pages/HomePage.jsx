import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";
import "../styles/HomePage.css";

function HomePage(props) {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Vše");

    useEffect(() => {
        fetch("http://localhost:8080/api/quizzes")
            .then(res => res.json())
            .then(data => {
                setQuizzes(data);
            })
            .catch(err => console.error("Chyba při načítání kvízů:", err));
    }, []);

    const startQuiz = (quizCode) => {
        navigate(`/quiz?type=${quizCode}`);
    };


    // BLOK REŽIMU ÚDRŽBY
    const isMaintenance = localStorage.getItem("maintenanceMode") === "true";

    if (isMaintenance && props.username !== "root") {
        return (
            <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
                <h1 style={{ fontSize: "50px", margin: "0" }}>🛠️</h1>
                <h2 style={{ color: "#d9534f" }}>Probíhá údržba systému</h2>
                <p style={{ color: "#555", fontSize: "18px" }}>
                    Omlouváme se, kvízy jsou momentálně nedostupné, protože pracujeme na vylepšení aplikace.<br/>
                    Zkuste to prosím později.
                </p>
                <button
                    onClick={props.logout}
                    style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px" }}
                >
                    Odhlásit se
                </button>
            </div>
        );
    }
    const getQuizCategory = (quiz) => {
        const title = quiz.title.toLowerCase();

        if (title.includes("města") || title.includes("zeměpis")) {
            return "Zeměpis";
        }
        if (title.includes("ou") || title.includes("ostravsk") || title.includes("univerzit")) {
            return "Univerzita";
        }
        return "Ostatní";
    };
    const categories = ["Vše", "Zeměpis", "Univerzita", "Ostatní"];
    const filteredQuizzes = quizzes.filter(quiz => {
        if (activeCategory === "Vše") return true;
        return getQuizCategory(quiz) === activeCategory;
    });
    return (
        <div className="home-container">
            <AdminMenu
                username={props.username}
                isAdmin={props.isAdmin}
                logout={props.logout}
            />

            <div className="home-header">
                <h1 className="home-title">Vítej, soudruhu!</h1>
                <p className="home-subtitle">
                    Komise tvé přihlášení schválila. Vyber si kategorii, zvol kvíz a ukaž, co v tobě je.
                </p>
            </div>

            <div className="category-tabs">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`tab-button ${activeCategory === category ? "active" : ""}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="quizzes-grid">
                {filteredQuizzes.length > 0 ? (
                    filteredQuizzes.map((quiz) => (
                        <div key={quiz.id} className="quiz-card">
                            <div>
                                <h2 className="quiz-title">{quiz.title}</h2>
                                <p className="quiz-desc">{quiz.description}</p>
                            </div>
                            <button
                                className="quiz-start-btn"
                                onClick={() => startQuiz(quiz.code)}
                            >
                                Spustit kvíz
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", width: "100%", color: "#777", fontSize: "18px" }}>
                        V této kategorii zatím nejsou žádné kvízy.
                    </p>
                )}
            </div>
        </div>
    );
}

export default HomePage;