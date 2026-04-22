import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";

function HomePage(props) {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

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

    // ==========================================
    // 🛠️ BLOK REŽIMU ÚDRŽBY
    // ==========================================
    const isMaintenance = localStorage.getItem("maintenanceMode") === "true";

    // VŠIMNI SI: Změnili jsme username na props.username a logout na props.logout
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
    // ==========================================

    // Zbytek tvé stránky (zobrazí se pouze, pokud není údržba, NEBO pokud je přihlášen root)
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