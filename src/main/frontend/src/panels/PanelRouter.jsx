import React from "react";
import UserPanel from "./UserPanel";
import AdminPanel from "./AdminPanel";
import SuperAdminPanel from "./SuperAdminPanel";

function PanelRouter({ username, isAdmin, goBack }) {

    // Superadmin má nejvyšší prioritu
    if (username === "root") {
        return <SuperAdminPanel goBack={goBack} />;
    }

    // Admin
    if (isAdmin) {
        return <AdminPanel goBack={goBack} />;
    }

    // Normální uživatel
    return <UserPanel goBack={goBack} />;
}

export default PanelRouter;
