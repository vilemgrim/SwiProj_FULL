import React from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";

function HomePage(props) {

    const navigate = useNavigate();

    // 🔥 Jednoduchý seznam kvízů – snadno rozšiřitelný
    const quizzes = [
        {
            id: "EU_CAPITALS",
            title: "Hlavní města Evropy",
            description: "Otestuj si znalosti evropských hlavních měst."
        },
        {
            id: "ASIA_CAPITALS",
            title: "Hlavní města Asie",
            description: "Poznáš hlavní města asijských států?"
        },
        {
            id: "AFRICA_CAPITALS",
            title: "Hlavní města Afriky",
            description: "Prověř si znalosti afrických metropolí."
        }
    ];

    const startQuiz = (quizId) => {
        navigate(`/quiz?type=${quizId}`);
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

            {/* 🔥 ADMIN MENU – včetně logout */}
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

            {/* 🔥 GRID KARTIČEK S KVÍZY */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "20px",
                    maxWidth: "1000px",
                    margin: "0 auto"
                }}
            >
                {quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
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
                            onClick={() => startQuiz(quiz.id)}
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
