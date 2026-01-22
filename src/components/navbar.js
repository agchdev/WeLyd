"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "./providers";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Moon, Sun, Smartphone, Send } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const themes = [
        { id: 'light', icon: <Sun size={18} />, label: 'Light' },
        { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
        { id: 'blue', icon: <Send size={18} className="text-[#0088cc]" />, label: 'Telegram' },
        { id: 'green', icon: <Smartphone size={18} className="text-[#25D366]" />, label: 'WhatsApp' },
    ];

    const languages = ['es', 'en', 'fr'];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-opacity-70 border-b border-[var(--grid-color)]">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tighter">
                    WeLyd<span className="text-[var(--accent)]">.</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {Object.entries(t.nav).map(([key, label]) => (
                        <a key={key} href={`#${key}`} className="text-sm uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
                            {label}
                        </a>
                    ))}
                </div>

                {/* Controls (Theme & Lang) */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex gap-2 text-xs font-bold">
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`uppercase px-2 py-1 rounded-md transition-all ${language === lang ? 'bg-[var(--foreground)] text-[var(--background)]' : 'opacity-50 hover:opacity-100'}`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>

                    <div className="w-[1px] h-6 bg-[var(--foreground)] opacity-20"></div>

                    {/* Theme Switcher */}
                    <div className="flex gap-2">
                        {themes.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setTheme(item.id)}
                                className={`p-2 rounded-full transition-all ${theme === item.id ? 'bg-[var(--grid-color)] scale-110' : 'opacity-50 hover:opacity-100'}`}
                                title={item.label}
                            >
                                {item.icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-0 right-0 bg-[var(--background)] border-b border-[var(--grid-color)] p-6 md:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        {Object.entries(t.nav).map(([key, label]) => (
                            <a key={key} href={`#${key}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold hover:text-[var(--accent)]">
                                {label}
                            </a>
                        ))}

                        <div className="flex justify-between items-center mt-4 border-t border-[var(--grid-color)] pt-4">
                            <div className="flex gap-2">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        className={`uppercase px-2 py-1 text-sm rounded-md transition-all ${language === lang ? 'bg-[var(--foreground)] text-[var(--background)]' : 'opacity-50'}`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                {themes.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setTheme(item.id)}
                                        className={`p-2 rounded-full ${theme === item.id ? 'bg-[var(--grid-color)]' : 'opacity-50'}`}
                                    >
                                        {item.icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
