import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import HomePage from "./pages/HomePage";
import UserAdminPage from "./pages/UserAdminPage";
import QuizPage from "./pages/QuizPage";
import MyResultsPage from "./pages/MyResultsPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import ManageQuestionsPage from "./pages/ManageQuestionsPage";
import SystemSettingsPage from "./pages/SystemSettings";

function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

function App() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    // LOGIN
    const handleLogin = (user, adminFlag) => {
        setUsername(user);
        setIsAdmin(adminFlag);
        navigate("/home");
    };

    // LOGOUT
    const logout = () => {
        setUsername("");
        setIsAdmin(false);
        navigate("/");
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div style={{
                        minHeight: "100vh",
                        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                    }}>

                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            borderRadius: "20px",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                            padding: "50px 40px",
                            maxWidth: "600px",
                            width: "100%",
                            textAlign: "center"
                        }}>

                            <div style={{ fontSize: "60px", marginBottom: "10px" }}>🎓</div>
                            <h1 style={{
                                color: "#1e3c72",
                                marginBottom: "15px",
                                fontSize: "32px",
                                fontWeight: "bold"
                            }}>
                                Kvízy ze všech koutů světa
                            </h1>
                            <p style={{
                                color: "#555",
                                fontSize: "16px",
                                lineHeight: "1.5",
                                marginBottom: "40px"
                            }}>
                                Vítej na našem kvízovém portálu. Přihlas se, vytvoř si účet a ukaž, že na to máš!
                            </p>

                            {/* TLAČÍTKA */}
                            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>

                                {/* LOGIN */}
                                <div
                                    onClick={() => navigate("/login")}
                                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "15px",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        flexDirection: "column",
                                        transition: "transform 0.2s ease-in-out"
                                    }}
                                >
                                    <span style={{ fontSize: "40px" }}>🔑</span>
                                    <p style={{ margin: "10px 0 0 0", color: "#333", fontWeight: "500" }}>Přihlášení</p>
                                </div>

                                {/* REGISTER */}
                                <div
                                    onClick={() => navigate("/register")}
                                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "15px",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        flexDirection: "column",
                                        transition: "transform 0.2s ease-in-out"
                                    }}
                                >
                                    <span style={{ fontSize: "40px" }}>➕</span>
                                    <p style={{ margin: "10px 0 0 0", color: "#333", fontWeight: "500" }}>Nový účet</p>
                                </div>

                                {/* CHANGE PASSWORD */}
                                <div
                                    onClick={() => navigate("/change")}
                                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "15px",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        flexDirection: "column",
                                        transition: "transform 0.2s ease-in-out"
                                    }}
                                >
                                    <span style={{ fontSize: "40px" }}>🔄</span>
                                    <p style={{ margin: "10px 0 0 0", color: "#333", fontWeight: "500" }}>Změna hesla</p>
                                </div>

                            </div>

                            {/* Patička */}
                            <div style={{ marginTop: "40px", fontSize: "12px", color: "#999" }}>
                                © 2026 Semestrální projekt • Team 25
                            </div>

                        </div>
                    </div>
                }
            />

            {/* LOGIN */}
            <Route
                path="/login"
                element={<LoginPage goBack={() => navigate("/")} onLogin={handleLogin} />}
            />

            {/* REGISTER */}
            <Route
                path="/register"
                element={<RegisterPage goBack={() => navigate("/")} />}
            />

            {/* CHANGE PASSWORD */}
            <Route
                path="/change"
                element={<ChangePasswordPage goBack={() => navigate("/")} />}
            />

            {/* HOME */}
            <Route
                path="/home"
                element={
                    <HomePage
                        username={username}
                        isAdmin={isAdmin}
                        logout={logout}
                    />
                }
            />

            {/* ADMIN – Správa uživatelů */}
            <Route
                path="/admin/users"
                element={
                    <UserAdminPage
                        username={username}
                        isAdmin={isAdmin}
                    />
                }
            />

            {/* QUIZ PAGE */}
            <Route
                path="/quiz"
                element={<QuizPage />}
            />


            <Route
                path="/my-results"
                element={
                    <MyResultsPage
                        username={username}
                        isAdmin={isAdmin}
                        logout={logout}
                    />
                }
            />
            <Route
                path="/create-quiz"
                element={
                    <CreateQuizPage
                        username={username}
                        isAdmin={isAdmin}
                        logout={logout} />}
            />
            <Route
                path="/admin/questions"
                element={
                    <ManageQuestionsPage
                        username={username}
                        isAdmin={isAdmin}
                        logout={logout} />}
            />
            <Route
                path="/admin/system"
                element={
                    <SystemSettingsPage
                        username={username}
                        isAdmin={isAdmin}
                        logout={logout} />}
            />
        </Routes>

    );
}

export default AppWrapper;