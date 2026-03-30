import { create } from "node:domain";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface AppContextTypes {
    step: number
    setStep: Dispatch<SetStateAction<number>>
}
const AppContext = createContext<AppContextTypes | null>(null)

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<number>(0);
    return (
        <AppContext.Provider value={{ step, setStep }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be inside AppProvider')
    }
    return context;
}