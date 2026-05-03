import React, { useEffect, useState } from "react";
import AdminMenu from "../components/AdminMenu";

function MyResultsPage({ username, isAdmin, logout }) {
    const [results, setResults] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [activeQuiz, setActiveQuiz] = useState("ALL");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const loadResults = () => {
        fetch(`http://localhost:8080/api/results/user/${username}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server vrátil chybu: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const sorted = data.sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt));
                    setResults(sorted);
                    setFiltered(sorted);
                } else {
                    console.warn("Backend nevrátil pole výsledků. Přišlo toto:", data);
                    setResults([]);
                    setFiltered([]);
                }
                setPage(1);
            })
            .catch(err => {
                console.error("Chyba při stahování výsledků:", err);
                setResults([]);
                setFiltered([]);
                setPage(1);
            });
    };

    useEffect(() => {
        loadResults();
    }, []);

    const handleClear = () => {
        if (!window.confirm("Opravdu chceš smazat tyto výsledky?")) return;

        const url =
            activeQuiz === "ALL"
                ? `http://localhost:8080/api/results/user/${username}`
                : `http://localhost:8080/api/results/user/${username}/quiz/${activeQuiz}`;

        fetch(url, { method: "DELETE" })
            .then(() => loadResults());
    };

    useEffect(() => {
        let list = results;

        if (activeQuiz !== "ALL") {
            list = list.filter(r => r.quiz === activeQuiz);
        }

        if (search.trim() !== "") {
            list = list.filter(r =>
                r.quiz.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFiltered(list);
        setPage(1);
    }, [search, activeQuiz, results]);

    const startIndex = (page - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filtered.length / pageSize);

    const quizTabs = [
        { id: "ALL", label: "Vše" },
        { id: "EU_CAPITALS", label: "Evropa" },
        { id: "ASIA_CAPITALS", label: "Asie" },
        { id: "AFRICA_CAPITALS", label: "Afrika" },
        { id: "NORTH_AMERICA_CAPITALS", label: "Severní Amerika" },
        { id: "SOUTH_AMERICA_CAPITALS", label: "Jižní Amerika" },
        { id: "OCEANIA_CAPITALS", label: "Oceánie" },
        { id: "WORLD_CAPITALS", label: "Svět" }
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                padding: "20px",
                position: "relative",
                display: "flex",
                flexDirection: "row"
            }}
        >

            <div style={{ flexShrink: 0 }}>
                <AdminMenu
                    username={username}
                    isAdmin={isAdmin}
                    logout={logout}
                />
            </div>


            <div style={{
                flexGrow: 1,
                marginLeft: "40px",
                maxWidth: "900px"
            }}>

                <h2 style={{
                    marginBottom: "20px",
                    fontWeight: "600",
                    color: "#333"
                }}>
                    Moje výsledky
                </h2>


                <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {quizTabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveQuiz(tab.id)}
                            style={{
                                padding: "8px 14px",
                                borderRadius: "6px",
                                border: activeQuiz === tab.id ? "1px solid #007bff" : "1px solid #ccc",
                                cursor: "pointer",
                                background: activeQuiz === tab.id ? "#007bff" : "white",
                                color: activeQuiz === tab.id ? "white" : "#333",
                                fontWeight: activeQuiz === tab.id ? "600" : "normal",
                                transition: "0.15s"
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}

                    <button
                        onClick={loadResults}
                        style={{
                            marginLeft: "auto",
                            padding: "8px 14px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Refresh
                    </button>

                    <button
                        onClick={handleClear}
                        style={{
                            padding: "8px 14px",
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Clear
                    </button>
                </div>

                {/* VYHLEDÁVÁNÍ */}
                <input
                    type="text"
                    placeholder="Vyhledat kvíz..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        background: "white"
                    }}
                />


                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "white",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    <thead>
                    <tr style={{ background: "#eef1f5" }}>
                        <th style={th}>Kvíz</th>
                        <th style={th}>Skóre</th>
                        <th style={th}>Datum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginated.map((r, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={td}>{r.quiz}</td>
                            <td style={td}>{r.score} / {r.total}</td>
                            <td style={td}>{new Date(r.playedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>


                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)} style={pageBtn}>◀</button>
                    <span>Strana {page} / {totalPages}</span>
                    <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={pageBtn}>▶</button>
                </div>

            </div>
        </div>
    );
}

const th = { padding: "12px", textAlign: "left", fontWeight: "600", color: "#333" };
const td = { padding: "10px", color: "#444" };
const pageBtn = {
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "white"
};

export default MyResultsPage;
