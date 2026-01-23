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
            hero: { title: "Automatiza.", subtitle: "El Futuro es Ahora" },
            countdown: { days: "Dias", hours: "Horas", minutes: "Minutos", seconds: "Segundos" },
            panels: {
                title: "Paneles en accion",
                subtitle: "Todo el negocio en una sola vista.",
                hint: "Desliza para explorar las pantallas.",
                items: {
                    panel: { title: "Panel general", desc: "KPIs, facturacion y actividad en tiempo real." },
                    clientes: { title: "Clientes", desc: "Fichas con historial, notas y segmentacion." },
                    servicios: { title: "Servicios", desc: "Catalogo, precios, duracion y recursos por servicio." },
                    citas: { title: "Citas", desc: "Agenda inteligente con confirmaciones y recordatorios." },
                    empleados: { title: "Empleados", desc: "Turnos, permisos y rendimiento del equipo." },
                    listaEspera: { title: "Lista de espera", desc: "Captura interes, prioriza y llena huecos." },
                },
            },
            plans: { title: "Nuestros Planes" },
            contact: { title: "Hablemos" },
        },
        en: {
            nav: { home: "Home", projects: "Projects", plans: "Plans", contact: "Contact" },
            hero: { title: "Automate.", subtitle: "The Future is Now." },
            countdown: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
            panels: {
                title: "Panels in action",
                subtitle: "Everything in one clean view.",
                hint: "Swipe to explore the screens.",
                items: {
                    panel: { title: "Main dashboard", desc: "KPIs, revenue, and live activity at a glance." },
                    clientes: { title: "Clients", desc: "Profiles with history, notes, and segmentation." },
                    servicios: { title: "Services", desc: "Catalog, pricing, duration, and required resources." },
                    citas: { title: "Appointments", desc: "Smart scheduling with confirmations and reminders." },
                    empleados: { title: "Staff", desc: "Shifts, time-off, and team performance." },
                    listaEspera: { title: "Waitlist", desc: "Capture interest, prioritize, and fill gaps fast." },
                },
            },
            plans: { title: "Our Plans" },
            contact: { title: "Let's Talk" },
        },
        fr: {
            nav: { home: "Accueil", projects: "Projets", plans: "Plans", contact: "Contact" },
            hero: { title: "Automatisez.", subtitle: "Le Futur est Maintenant." },
            countdown: { days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes" },
            panels: {
                title: "Panneaux en action",
                subtitle: "Tout dans une vue claire.",
                hint: "Faites glisser pour voir les ecrans.",
                items: {
                    panel: { title: "Tableau principal", desc: "KPIs, revenus et activite en temps reel." },
                    clientes: { title: "Clients", desc: "Fiches avec historique, notes et segmentation." },
                    servicios: { title: "Services", desc: "Catalogue, prix, duree et ressources requises." },
                    citas: { title: "Rendez-vous", desc: "Agenda intelligent avec confirmations et rappels." },
                    empleados: { title: "Equipe", desc: "Plannings, conges et performance de l'equipe." },
                    listaEspera: { title: "Liste d'attente", desc: "Capte l'interet, priorise et remplit les creux." },
                },
            },
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
