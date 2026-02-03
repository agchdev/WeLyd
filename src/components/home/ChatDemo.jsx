"use client"
import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ChatDemo = () => {
    const reduceMotion = useReducedMotion()
    const [visibleMessages, setVisibleMessages] = useState(0)

    const messages = [
        {
            id: 1,
            text: "Hola 👋 ¿podría pedir una cita para el jueves?",
            isUser: true
        },
        {
            id: 2,
            text: "Claro. ¿Qué servicio necesitas?",
            isUser: false
        },
        {
            id: 3,
            text: "Cita confirmada. Te avisaremos si se libera un horario mejor.",
            isUser: true
        }
    ]

    useEffect(() => {
        const timers = []

        // Show messages progressively
        messages.forEach((_, index) => {
            const timer = setTimeout(() => {
                setVisibleMessages(index + 1)
            }, index * 1200) // 1.2s delay between messages

            timers.push(timer)
        })

        return () => timers.forEach(timer => clearTimeout(timer))
    }, [])

    const messageVariants = {
        hidden: reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 20, scale: 0.95 },
        visible: reduceMotion
            ? { opacity: 1, transition: { duration: 0.3 } }
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                }
            }
    }

    const iconVariants = {
        float: {
            y: [0, -8, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <section className='bg-gradient-to-b from-white to-gray-50 w-full py-20 md:py-32 flex justify-center items-center'>
            <div className='w-full max-w-md md:max-w-lg px-6'>
                {/* Chat Container */}
                <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100'>
                    {/* Bot Icon */}
                    <motion.div
                        className='flex items-center mb-6'
                        variants={!reduceMotion ? iconVariants : {}}
                        animate={!reduceMotion ? "float" : {}}
                    >
                        <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg'>
                            <svg className='w-7 h-7 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Messages */}
                    <div className='space-y-4'>
                        {messages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                className={`flex ${message.isUser ? 'justify-start' : 'justify-center'}`}
                                initial="hidden"
                                animate={index < visibleMessages ? "visible" : "hidden"}
                                variants={messageVariants}
                            >
                                <div className={`
                                    max-w-[85%] px-5 py-3 rounded-2xl
                                    ${message.isUser
                                        ? 'bg-gray-100 text-gray-800'
                                        : 'bg-indigo-50 text-indigo-900 border border-indigo-100'
                                    }
                                    shadow-sm
                                `}>
                                    <p className='text-sm md:text-base leading-relaxed'>
                                        {message.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer info */}
                    <motion.div
                        className='mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: visibleMessages >= messages.length ? 1 : 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                        </svg>
                        <span>Agenda optimizada</span>
                        <span className='mx-1'>•</span>
                        <span className='italic'>ia asistida</span>
                        <span className='mx-1'>•</span>
                        <span>Ligando spare activa</span>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ChatDemo
