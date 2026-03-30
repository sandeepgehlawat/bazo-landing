'use client'

import { useState, useEffect } from "react";
import AdminLogin from "./components/AdminLogin";
import Sidebar, { type AdminSection } from "./components/Sidebar";
import ApplicationsPanel from "./components/ApplicationsPanel";
import SellersPanel from "./components/SellersPanel";
import CategoriesPanel from "./components/CategoriesPanel";
import PayoutsPanel from "./components/PayoutsPanel";
import RefundsPanel from "./components/RefundsPanel";
import ConfigPanel from "./components/ConfigPanel";

function isAdminLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("access_token");
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role !== "ADMIN") return false;
        // Check if token is expired
        if (payload.exp && payload.exp * 1000 < Date.now()) return false;
        return true;
    } catch {
        return false;
    }
}

const panels: Record<AdminSection, React.ComponentType> = {
    applications: ApplicationsPanel,
    sellers: SellersPanel,
    categories: CategoriesPanel,
    payouts: PayoutsPanel,
    refunds: RefundsPanel,
    config: ConfigPanel,
};

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [checking, setChecking] = useState(true);
    const [activeSection, setActiveSection] = useState<AdminSection>("applications");

    useEffect(() => {
        setAuthed(isAdminLoggedIn());
        setChecking(false);
    }, []);

    function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAuthed(false);
    }

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-black rounded-full" />
            </div>
        );
    }

    if (!authed) {
        return <AdminLogin onLogin={() => setAuthed(true)} />;
    }

    const ActivePanel = panels[activeSection];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar active={activeSection} onChange={setActiveSection} onLogout={handleLogout} />
            <main className="flex-1 p-8">
                <ActivePanel />
            </main>
        </div>
    );
}
