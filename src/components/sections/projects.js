"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../providers";

const projects = [
    { id: 1, title: "FinTech Dashboard", category: "Web App", color: "#3b82f6" },
    { id: 2, title: "E-Commerce Bot", category: "Telegram Bot", color: "#25D366" },
    { id: 3, title: "Real Estate AI", category: "Automation", color: "#8b5cf6" },
    { id: 4, title: "Health Tracker", category: "Mobile App", color: "#f43f5e" },
];

export default function Projects() {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-32 px-6 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[var(--grid-color)] pb-10"
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">{t.nav.projects}</h2>
                    <p className="text-xl md:text-2xl font-mono opacity-60 text-right max-w-sm mt-8 md:mt-0">
                        Selected works for forward-thinking companies.
                    </p>
                </motion.div>

                <div className="flex flex-col">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 0.98 }}
                            className="group relative border-b border-[var(--grid-color)] py-16 cursor-pointer overflow-hidden"
                        >
                            {/* Hover Background Reveal */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-[var(--grid-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-baseline gap-4 md:gap-0 px-4">
                                <span className="text-sm font-mono opacity-40">0{project.id}</span>

                                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-4">
                                    <span
                                        className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[var(--foreground)] opacity-60 group-hover:opacity-100 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all"
                                    >
                                        {project.category}
                                    </span>
                                    <ArrowUpRight
                                        size={40}
                                        className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--accent)]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
