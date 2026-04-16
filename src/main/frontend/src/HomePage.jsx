import React from "react";

function HomePage(props) {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: "#e8f0fe" }}>
            <h1>Vítej, kolego!</h1>

            <button
                onClick={() => {
                    props.logout();
                }}
                style={{ padding: "10px 20px", cursor: "pointer", background: "red", color: "white", marginTop: "20px" }}
            >
                Odhlásit se
            </button>
        </div>
    );
}

export default HomePage;