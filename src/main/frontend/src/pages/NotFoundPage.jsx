import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <h1 className="notfound-code">404</h1>
            <h2 className="notfound-title">Jejda! Tady nic není.</h2>
            <p className="notfound-text">
                Stránka, kterou hledáte, neexistuje, byla přesunuta, nebo jste možná udělali překlep v adrese. Komise tuto cestu bohužel neschválila.
            </p>
            <button className="notfound-btn" onClick={() => navigate("/")}>
                🏠 Zpět na hlavní stránku
            </button>
        </div>
    );
}

export default NotFoundPage;