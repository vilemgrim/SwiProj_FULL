import React, { useEffect, useState } from "react";

function UserManagement({ username, isAdmin }) {
    const [users, setUsers] = useState([]);

    // Funkce pro načtení a seřazení uživatelů
    const refreshUsers = () => {
        fetch("http://localhost:8080/api/auth/users")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => {
                    // Admini nahoře
                    if (a.admin && !b.admin) return -1;
                    if (!a.admin && b.admin) return 1;

                    // Pak abecedně
                    return a.username.localeCompare(b.username);
                });

                setUsers(sorted);
            });
    };

    // Načtení při otevření panelu
    useEffect(() => {
        refreshUsers();
    }, []);

    // Povýšení na admina
    const promote = (target) => {
        fetch(`http://localhost:8080/api/auth/make-admin?caller=${username}&targetUser=${target}`, {
            method: "POST"
        }).then(() => refreshUsers());
    };

    // Odebrání admina (jen superadmin)
    const demote = (target) => {
        fetch(`http://localhost:8080/api/auth/remove-admin?caller=${username}&targetUser=${target}`, {
            method: "POST"
        }).then(() => refreshUsers());
    };

    return (
        <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 0 6px rgba(0,0,0,0.15)",
            maxHeight: "300px",          // scrollovací výška
            overflowY: "auto",           // scroll
            width: "280px"               // hezká šířka panelu
        }}>
            <h3 style={{ marginTop: 0 }}>Správa uživatelů</h3>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ borderBottom: "1px solid #ccc", padding: "6px" }}>Uživatel</th>
                    <th style={{ borderBottom: "1px solid #ccc", padding: "6px" }}>Admin</th>
                    <th style={{ borderBottom: "1px solid #ccc", padding: "6px" }}>Akce</th>
                </tr>
                </thead>

                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td style={{ padding: "6px" }}>{u.username}</td>
                        <td style={{ padding: "6px" }}>{u.admin ? "ANO" : "NE"}</td>
                        <td style={{ padding: "6px" }}>
                            {/* Povýšit */}
                            {!u.admin && (
                                <button onClick={() => promote(u.username)}>
                                    Povýšit
                                </button>
                            )}

                            {/* Odebrat admina – jen superadmin */}
                            {username === "root" && u.admin && u.username !== "root" && (
                                <button
                                    onClick={() => demote(u.username)}
                                    style={{ marginLeft: "10px" }}
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
    );
}

export default UserManagement;
