"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("es"); // Default to Spanish

    const toggleLanguage = (lang) => {
        setLanguage(lang);
    };

    const translations = {
        es: {
            nav: { home: "Inicio", projects: "Proyectos", plans: "Planes", contact: "Contacto" },
            hero: { title: "Automatiza.", subtitle: "El Futuro es Ahora." },
            plans: { title: "Nuestros Planes" },
            contact: { title: "Hablemos" },
        },
        en: {
            nav: { home: "Home", projects: "Projects", plans: "Plans", contact: "Contact" },
            hero: { title: "Automate.", subtitle: "The Future is Now." },
            plans: { title: "Our Plans" },
            contact: { title: "Let's Talk" },
        },
        fr: {
            nav: { home: "Accueil", projects: "Projets", plans: "Plans", contact: "Contact" },
            hero: { title: "Automatisez.", subtitle: "Le Futur est Maintenant." },
            plans: { title: "Nos Plans" },
            contact: { title: "Parlons-en" },
        },
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);

export function Providers({ children }) {
    return (
        <LanguageProvider>
            <NextThemesProvider attribute="data-theme" defaultTheme="dark" themes={['light', 'dark', 'blue', 'green']}>
                {children}
            </NextThemesProvider>
        </LanguageProvider>
    );
}
