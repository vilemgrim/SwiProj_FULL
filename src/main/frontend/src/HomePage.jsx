import React from "react";

function HomePage(props) {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#e8f0fe",
                textAlign: "center",
                padding: "20px",
                position: "relative" // kvůli pravému hornímu rohu
            }}
        >

            {/* Pravý horní roh – nickname + role */}
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    textAlign: "right"
                }}
            >
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {props.username}
                </div>

                {props.isAdmin && (
                    <div
                        style={{
                            fontSize: "14px",
                            color: "red",
                            fontWeight: "bold",
                            marginTop: "4px"
                        }}
                    >
                        ADMIN
                    </div>
                )}
            </div>

            {/* Tvoje původní uvítání */}
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
                Vítej, soudruhu!
            </h1>

            <p style={{ fontSize: "18px", maxWidth: "500px", marginBottom: "30px", color: "#333" }}>
                Komise tvé přihlášení schválila.
                Pokud budeš chtít změnit heslo, vrať se do hlavního menu.
            </p>

            <button
                onClick={() => props.logout()}
                style={{
                    padding: "12px 24px",
                    cursor: "pointer",
                    background: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    transition: "0.2s"
                }}
                onMouseOver={(e) => (e.target.style.background = "#c9302c")}
                onMouseOut={(e) => (e.target.style.background = "#d9534f")}
            >
                Odhlásit se
            </button>
        </div>
    );
}

export default HomePage;
