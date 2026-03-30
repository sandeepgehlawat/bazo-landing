'use client'

const navItems = [
    { id: "applications", label: "Applications" },
    { id: "sellers", label: "Sellers" },
    { id: "categories", label: "Categories" },
    { id: "payouts", label: "Payouts" },
    { id: "refunds", label: "Refunds" },
    { id: "config", label: "Config" },
] as const;

export type AdminSection = (typeof navItems)[number]["id"];

export default function Sidebar({
    active,
    onChange,
    onLogout,
}: {
    active: AdminSection;
    onChange: (s: AdminSection) => void;
    onLogout: () => void;
}) {
    return (
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            <div className="px-5 py-5 border-b border-gray-200">
                <h2 className="text-lg font-bold">Bazo Admin</h2>
            </div>
            <nav className="flex-1 py-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onChange(item.id)}
                        className={`w-full text-left px-5 py-2.5 text-sm font-medium transition cursor-pointer ${
                            active === item.id
                                ? "bg-gray-100 text-black"
                                : "text-gray-600 hover:bg-gray-50 hover:text-black"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}
