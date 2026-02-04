"use client"
import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Features = () => {
    const reduceMotion = useReducedMotion()

    const features = [
        {
            id: 1,
            title: "Chat inteligente",
            icon: (
                <svg className='w-12 h-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
            ),
            items: ["Atiende", "Responde", "Filtra"],
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            featured: false
        },
        {
            id: 2,
            title: "Agenda automatizada",
            icon: (
                <svg className='w-12 h-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
            ),
            items: ["Confirma", "Cancela", "Reasigna"],
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            featured: true,
            badge: "Recomendado"
        },
        {
            id: 3,
            title: "Datos claros",
            icon: (
                <svg className='w-12 h-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
            ),
            items: ["Ocupación", "No-shows", "Demanda"],
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            featured: false
        }
    ]

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const cardVariants = {
        hidden: reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 30, scale: 0.95 },
        visible: reduceMotion
            ? { opacity: 1, transition: { duration: 0.4 } }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                }
            }
    }

    return (
        <section className='bg-[#f6f8fb] w-full py-20 md:py-28'>
            <div className='max-w-6xl mx-auto px-6'>
                <div className='rounded-[36px] bg-white/90 border border-gray-100 shadow-2xl shadow-slate-200/70 px-8 py-12 md:px-12 md:py-16'>
                    <div className='text-center max-w-2xl mx-auto'>
                        <p className='text-[11px] font-semibold tracking-[0.3em] text-slate-400 uppercase'>Cómo funciona</p>
                        <h2 className='mt-3 text-3xl md:text-4xl font-semibold text-slate-800'>
                            Automatiza procesos sin perder el toque humano
                        </h2>
                        <p className='mt-3 text-sm md:text-base text-slate-500'>
                            Tres módulos clave que trabajan juntos para optimizar tu agenda y mejorar la experiencia del cliente.
                        </p>
                    </div>

                    <motion.div
                        className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end'
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {features.map((feature) => (
                            <motion.div
                                key={feature.id}
                                className={`
                                    relative group
                                    rounded-3xl px-6 py-8 md:px-7
                                    border transition-all duration-500
                                    ${feature.featured
                                        ? 'bg-gradient-to-b from-white via-white to-indigo-50/60 border-indigo-100 shadow-2xl shadow-indigo-200/50 scale-105 md:scale-110 z-10'
                                        : 'bg-white border-slate-200/70 shadow-xl shadow-slate-200/60'}
                                `}
                                variants={cardVariants}
                                whileHover={!reduceMotion ? { y: -6 } : {}}
                            >
                                {feature.badge && (
                                    <span className='absolute left-1/2 -top-3 -translate-x-1/2 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500 text-white px-3 py-1 rounded-full shadow-md'>
                                        {feature.badge}
                                    </span>
                                )}

                                {/* Icon */}
                                <motion.div
                                    className={`
                                        ${feature.iconBg} ${feature.iconColor}
                                        w-16 h-16 rounded-2xl
                                        flex items-center justify-center
                                        mb-6
                                        transition-transform duration-500
                                        group-hover:scale-105
                                    `}
                                >
                                    {feature.icon}
                                </motion.div>

                                {/* Title */}
                                <h3 className='text-xl font-semibold text-slate-800 mb-5'>
                                    {feature.title}
                                </h3>

                                {/* Items List */}
                                <ul className='space-y-3'>
                                    {feature.items.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className='flex items-center gap-3 text-slate-600'
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + 0.3 }}
                                        >
                                            <span className='w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center'>
                                                <svg className='w-2.5 h-2.5 text-slate-500' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                                                    <path fillRule='evenodd' d='M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z' clipRule='evenodd' />
                                                </svg>
                                            </span>
                                            <span className='text-sm md:text-base'>{item}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <motion.button
                                    className='
                                        mt-8 w-full
                                        text-slate-600 text-sm font-medium
                                        py-3 px-6 rounded-full
                                        border border-slate-200
                                        transition-all duration-300
                                        hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300
                                        hover:shadow-md
                                    '
                                    whileHover={!reduceMotion ? { y: -2 } : {}}
                                    whileTap={!reduceMotion ? { scale: 0.98 } : {}}
                                >
                                    Solicitar demo
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Features
