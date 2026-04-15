import React from "react";

function HomePage({ logout }) {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#e8f0fe"
        }}>
            <h1>Vítej, kolego!</h1>
            <p>Ahoj.</p>
        </div>
    );
}

export default HomePage;
