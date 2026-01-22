"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../providers";

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section id="contact" className="min-h-screen py-32 px-6 bg-[var(--background)] flex flex-col justify-center items-center relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-[var(--accent)] blur-[150px] opacity-10 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50vh] h-[50vh] bg-[var(--secondary)] blur-[150px] opacity-10 rounded-full pointer-events-none" />

            <div className="max-w-4xl w-full z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6">{t.contact.title}</h2>
                    <p className="text-xl opacity-60 font-mono">
                        Ready to automate your future?
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Name</label>
                            <input
                                type="text"
                                className="bg-transparent border-b border-[var(--grid-color)] py-4 text-2xl font-light focus:outline-none focus:border-[var(--accent)] transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email</label>
                            <input
                                type="email"
                                className="bg-transparent border-b border-[var(--grid-color)] py-4 text-2xl font-light focus:outline-none focus:border-[var(--accent)] transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-50">Message</label>
                        <textarea
                            rows="4"
                            className="bg-transparent border-b border-[var(--grid-color)] py-4 text-2xl font-light focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                            placeholder="Tell us about your project..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-8 self-end px-12 py-6 bg-[var(--foreground)] text-[var(--background)] font-black uppercase tracking-widest text-lg hover:bg-[var(--accent)] hover:text-white transition-all transform hover:scale-105"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>

            <footer className="absolute bottom-6 w-full text-center opacity-30 text-xs font-mono uppercase">
                © {new Date().getFullYear()} WeLyd Agency. All rights reserved.
            </footer>
        </section>
    );
}
