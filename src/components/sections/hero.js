"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../providers";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section id="home" className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-grid-pattern">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background)] z-0 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 text-center flex flex-col items-center"
            >
                <motion.h1
                    className="text-[12vw] md:text-[10vw] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[var(--foreground)] to-[var(--secondary)]"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    WeLyd
                </motion.h1>

                <motion.p
                    className="text-xl md:text-3xl font-light tracking-[0.2em] uppercase text-[var(--accent)] mt-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {t.hero.title}
                </motion.p>

                <motion.p
                    className="text-sm md:text-md opacity-60 mt-4 max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {t.hero.subtitle}
                </motion.p>
            </motion.div>

            {/* Floating Elements for "Many Animations" */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[var(--accent)] blur-[80px] opacity-20"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--foreground)] blur-[100px] opacity-10"
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, -40, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
        </section>
    );
}
