"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "../providers";

const panels = [
    { id: "panel", src: "/panel.png" },
    { id: "clientes", src: "/clientes.png" },
    { id: "servicios", src: "/servicios.png" },
    { id: "citas", src: "/citas.png" },
    { id: "empleados", src: "/empleados.png" },
    { id: "listaEspera", src: "/listaEspera.png" },
];

export default function Panels() {
    const { t } = useLanguage();

    return (
        <section id="panels" className="relative overflow-hidden bg-[var(--background)] py-28">
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                >
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                        {t.panels.title}
                    </h2>
                    <p className="text-xl md:text-2xl font-mono opacity-70 max-w-2xl">
                        {t.panels.subtitle}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
                        {t.panels.hint}
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
                    <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth no-scrollbar">
                        {panels.map((panel, index) => (
                            <motion.div
                                key={panel.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="snap-center shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] max-w-[900px]"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--grid-color)] bg-[var(--background)] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                                    <div className="absolute inset-0 bg-[var(--grid-color)] opacity-20 pointer-events-none" />
                                    <Image
                                        src={panel.src}
                                        alt={t.panels.items[panel.id].title}
                                        fill
                                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 70vw, 60vw"
                                        className="object-contain"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    {panels.map((panel, index) => (
                        <motion.div
                            key={`${panel.id}-text`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-t border-[var(--grid-color)] pt-8"
                        >
                            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                                {t.panels.items[panel.id].title}
                            </h3>
                            <p className="mt-4 text-xl md:text-2xl opacity-70">
                                {t.panels.items[panel.id].desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
