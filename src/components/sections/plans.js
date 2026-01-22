"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "../providers";

const plans = [
    {
        name: "Starter",
        price: "500",
        features: ["Landing Page", "SEO Basic", "1 Month Support"],
        highlight: false,
    },
    {
        name: "Business",
        price: "1500",
        features: ["Web + CMS", "SEO Advanced", "Automations Setup", "Priority Support"],
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        features: ["Full Custom App", "AI Integration", "Dedicated Team", "24/7 Support"],
        highlight: false,
    },
];

export default function Plans() {
    const { t } = useLanguage();

    return (
        <section id="plans" className="py-32 px-6 flex flex-col items-center justify-center bg-[var(--background)] relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black mb-20 text-center tracking-tighter"
            >
                {t.plans.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full z-10">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`relative p-8 rounded-3xl border ${plan.highlight ? 'border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_0_40px_rgba(var(--accent),0.2)]' : 'border-[var(--grid-color)] bg-[var(--background)]'} flex flex-col gap-6 overflow-hidden group`}
                    >
                        {plan.highlight && (
                            <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                POPULAR
                            </div>
                        )}

                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-wide">{plan.name}</h3>
                            <div className="flex items-baseline mt-2">
                                <span className="text-4xl font-black">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</span>
                                {typeof plan.price === 'number' && <span className="text-sm opacity-60 ml-2">/mo</span>}
                            </div>
                        </div>

                        <ul className="flex flex-col gap-3 flex-grow">
                            {plan.features.map((feat) => (
                                <li key={feat} className="flex items-center gap-3">
                                    <Check size={18} className="text-[var(--accent)]" />
                                    <span className="opacity-80 font-mono text-sm">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${plan.highlight ? 'bg-[var(--accent)] text-white hover:brightness-110' : 'bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-white'}`}>
                            Select
                        </button>

                        {/* Hover Effect Background */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)] blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
