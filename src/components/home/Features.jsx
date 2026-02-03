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
            gradient: "from-indigo-50 to-blue-50",
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600"
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
            gradient: "from-purple-50 to-indigo-50",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
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
            gradient: "from-blue-50 to-cyan-50",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
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
        <section className='bg-white w-full py-20 md:py-28'>
            <div className='max-w-7xl mx-auto px-6'>
                <motion.div
                    className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'
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
                                bg-gradient-to-br ${feature.gradient}
                                rounded-3xl p-8
                                border border-gray-100
                                transition-all duration-500
                                hover:shadow-2xl hover:shadow-indigo-100/50
                                hover:-translate-y-2
                            `}
                            variants={cardVariants}
                            whileHover={!reduceMotion ? { scale: 1.02 } : {}}
                        >
                            {/* Icon */}
                            <motion.div
                                className={`
                                    ${feature.iconBg} ${feature.iconColor}
                                    w-20 h-20 rounded-2xl
                                    flex items-center justify-center
                                    mb-6
                                    transition-transform duration-500
                                    group-hover:scale-110 group-hover:rotate-3
                                `}
                            >
                                {feature.icon}
                            </motion.div>

                            {/* Title */}
                            <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                                {feature.title}
                            </h3>

                            {/* Items List */}
                            <ul className='space-y-3'>
                                {feature.items.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className='flex items-center gap-3 text-gray-600'
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                    >
                                        <span className='w-1.5 h-1.5 rounded-full bg-gray-400' />
                                        <span className='text-base'>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.button
                                className='
                                    mt-8 w-full
                                    text-gray-400 text-sm font-medium
                                    py-3 px-6 rounded-xl
                                    border border-gray-200
                                    transition-all duration-300
                                    hover:bg-white hover:text-gray-600 hover:border-gray-300
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
        </section>
    )
}

export default Features
