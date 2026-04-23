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
import "./pages/LandingPage.css";

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
                    <div className="landing-container">
                        <div className="landing-card">
                            <div className="landing-icon">🎓</div>
                            <h1 className="landing-title">Kvízy Ostravské univerzity</h1>
                            <p className="landing-subtitle">
                                Vítej na oficiálním testovacím portálu. Přihlas se, vytvoř si účet a ukaž, že na to máš!
                            </p>

                            <div className="landing-options">
                                <div className="landing-option-card" onClick={() => navigate("/login")}>
                                    <span>🔑</span>
                                    <p>Přihlášení</p>
                                </div>

                                <div className="landing-option-card" onClick={() => navigate("/register")}>
                                    <span>➕</span>
                                    <p>Nový účet</p>
                                </div>

                                <div className="landing-option-card" onClick={() => navigate("/change")}>
                                    <span>🔄</span>
                                    <p>Změna hesla</p>
                                </div>
                            </div>

                            <div className="landing-footer">
                                © 2026 Semestrální projekt • Team 25
                            </div>
                        </div>
                    </div>
                }
            />

            <Route path="/login" element={<LoginPage goBack={() => navigate("/")} onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage goBack={() => navigate("/")} />} />
            <Route path="/change" element={<ChangePasswordPage goBack={() => navigate("/")} />} />
            <Route path="/home" element={<HomePage username={username} isAdmin={isAdmin} logout={logout} />} />
            <Route path="/admin/users" element={<UserAdminPage username={username} isAdmin={isAdmin} />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/my-results" element={<MyResultsPage username={username} isAdmin={isAdmin} logout={logout} />} />
            <Route path="/create-quiz" element={<CreateQuizPage username={username} isAdmin={isAdmin} logout={logout} />} />
            <Route path="/admin/questions" element={<ManageQuestionsPage username={username} isAdmin={isAdmin} logout={logout} />} />
            <Route path="/admin/system" element={<SystemSettingsPage username={username} isAdmin={isAdmin} logout={logout} />} />
        </Routes>
    );
}

export default AppWrapper;