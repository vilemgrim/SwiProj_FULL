import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ChangePasswordPage from "./ChangePasswordPage";
import HomePage from "./pages/HomePage";
import UserAdminPage from "./pages/UserAdminPage";
import QuizPage from "./pages/QuizPage";
import MyResultsPage from "./pages/MyResultsPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import ManageQuestionsPage from "./pages/ManageQuestionsPage";
import SystemSettings from "./pages/SystemSettings";
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

            {/* Hlavní menu */}
            <Route
                path="/"
                element={
                    <div style={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        flexDirection: "column"
                    }}>
                        <h1>Správa účtu</h1>

                        <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>

                            {/* LOGIN */}
                            <div
                                onClick={() => navigate("/login")}
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    backgroundColor: "white",
                                    borderRadius: "15px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    flexDirection: "column"
                                }}
                            >
                                <span style={{ fontSize: "40px" }}>🔑</span>
                                <p>Přihlášení</p>
                            </div>

                            {/* REGISTER */}
                            <div
                                onClick={() => navigate("/register")}
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    backgroundColor: "white",
                                    borderRadius: "15px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    flexDirection: "column"
                                }}
                            >
                                <span style={{ fontSize: "40px" }}>➕</span>
                                <p>Nový účet</p>
                            </div>

                            {/* CHANGE PASSWORD */}
                            <div
                                onClick={() => navigate("/change")}
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    backgroundColor: "white",
                                    borderRadius: "15px",
                                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    flexDirection: "column"
                                }}
                            >
                                <span style={{ fontSize: "40px" }}>🔄</span>
                                <p>Změna hesla</p>
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
