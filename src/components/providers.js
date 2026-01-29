"use client";

import { createContext, useContext } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const translations = {
    hero: { title: "Automatiza.", subtitle: "El Futuro es Ahora" },
    countdown: { days: "Dias", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
};

const LanguageContext = createContext({ t: translations });

export function LanguageProvider({ children }) {
    return (
        <LanguageContext.Provider value={{ t: translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);

export function Providers({ children }) {
    return (
        <LanguageProvider>
            <NextThemesProvider attribute="data-theme" defaultTheme="dark" themes={["dark"]}>
                {children}
            </NextThemesProvider>
        </LanguageProvider>
    );
}
