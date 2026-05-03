import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";

function UserAdminPage({ username }) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const refreshUsers = () => {
        fetch("http://localhost:8080/api/auth/users")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => {
                    if (a.admin && !b.admin) return -1;
                    if (!a.admin && b.admin) return 1;
                    return a.username.localeCompare(b.username);
                });
                setUsers(sorted);
            });
    };

    useEffect(() => {
        refreshUsers();
    }, []);

    const promote = (target) => {
        fetch(`http://localhost:8080/api/auth/make-admin?caller=${username}&targetUser=${target}`, {
            method: "POST"
        }).then(() => refreshUsers());
    };

    const demote = (target) => {
        fetch(`http://localhost:8080/api/auth/remove-admin?caller=${username}&targetUser=${target}`, {
            method: "POST"
        }).then(() => refreshUsers());
    };

    const btn = {
        padding: "6px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        transition: "0.2s",
        background: "#4a90e2",
        color: "white"
    };

    const btnDanger = {
        ...btn,
        background: "#d9534f"
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e8f0fe",
                fontFamily: "Arial, sans-serif",
                padding: "20px",
                position: "relative"
            }}
        >


            <AdminMenu username={username} isAdmin={true} />


            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 0 12px rgba(0,0,0,0.15)",
                    width: "600px",
                    textAlign: "center"
                }}
            >
                <h1 style={{ marginBottom: "20px" }}>Správa uživatelů</h1>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "16px"
                    }}
                >
                    <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Uživatel</th>
                        <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Admin</th>
                        <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Akce</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                                {u.username}
                            </td>

                            <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                                {u.admin ? "ANO" : "NE"}
                            </td>

                            <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                                {!u.admin && (
                                    <button
                                        style={btn}
                                        onMouseOver={(e) => e.target.style.background = "#357ABD"}
                                        onMouseOut={(e) => e.target.style.background = "#4a90e2"}
                                        onClick={() => promote(u.username)}
                                    >
                                        Povýšit
                                    </button>
                                )}

                                {username === "root" && u.admin && u.username !== "root" && (
                                    <button
                                        style={{ ...btnDanger, marginLeft: "10px" }}
                                        onMouseOver={(e) => e.target.style.background = "#c9302c"}
                                        onMouseOut={(e) => e.target.style.background = "#d9534f"}
                                        onClick={() => demote(u.username)}
                                    >
                                        Odebrat
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserAdminPage;
