"use client";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useLanguage } from "../providers";

const cards = [
    { id: 1, title: "Automation", desc: "Zapier, Make, n8n workflows." },
    { id: 2, title: "Web Dev", desc: "Next.js, React, Tailwind." },
    { id: 3, title: "App Dev", desc: "React Native, Expo." },
    { id: 4, title: "Bots", desc: "Telegram & WhatsApp Bots." },
    { id: 5, title: "AI Agents", desc: "Custom LLM Integrations." },
];

export default function HorizontalScroll() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    const { t } = useLanguage();

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[var(--background)]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-10 pl-20 pr-20">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="group relative h-[60vh] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--grid-color)] border border-[var(--secondary)]/20 transition-all hover:scale-105"
                        >
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 bg-[var(--background)]/80 backdrop-blur-sm transition-colors group-hover:bg-[var(--accent)]/10">
                                <h3 className="text-4xl font-black uppercase text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                    {card.title}
                                </h3>
                                <p className="mt-4 text-lg text-[var(--secondary)] font-mono">
                                    {card.desc}
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-[6rem] font-bold leading-none">
                                {card.id}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
