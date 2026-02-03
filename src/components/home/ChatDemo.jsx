"use client"
import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const TypingIndicator = () => {
    return (
        <div className='flex gap-1 px-4 py-3'>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className='w-2 h-2 bg-indigo-400 rounded-full'
                    animate={{
                        y: [0, -6, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

const AppointmentCard = ({ show }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl p-5 shadow-lg border border-indigo-50 mt-4 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="font-semibold text-gray-900">Corte de pelo y barba</h4>
                    <p className="text-sm text-gray-500">Jueves, 23 Enero</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                    </svg>
                    Confirmada
                </span>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                    AG
                </div>
                <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">Alejandro G.</p>
                    <p className="text-[10px] text-gray-400">Cliente recurrente</p>
                </div>
                <div className="text-indigo-600 font-bold text-sm">
                    15:30
                </div>
            </div>
        </motion.div>
    )
}

const CalendarPanel = ({ appointmentConfirmed }) => {
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    const dates = Array.from({ length: 31 }, (_, i) => i + 1)
    const currentDay = 23 // Jueves 23

    return (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Enero 2026</h3>
                    <p className="text-xs text-gray-400">Agenda disponible</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map(day => (
                    <div key={day} className="text-center text-[10px] font-medium text-gray-400 py-1">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm">
                {/* Empty slots for start of month (assuming starts on Thursday for example) */}
                {[...Array(3)].map((_, i) => <div key={`empty-${i}`} />)}

                {dates.slice(0, 15).map(date => (
                    <div key={date} className={`
                        aspect-square flex items-center justify-center rounded-lg text-xs transition-all duration-300
                        ${date === currentDay && appointmentConfirmed
                            ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200 ring-2 ring-indigo-100 ring-offset-1 scale-105'
                            : 'text-gray-600 hover:bg-gray-50'}
                    `}>
                        {date}
                    </div>
                ))}
                {/* Just showing half month for aesthetic compactness */}
            </div>

            {/* Dynamic Appointment Card */}
            <div className="mt-auto pt-6 min-h-[140px] relative">
                <AnimatePresence mode="wait">
                    {appointmentConfirmed ? (
                        <AppointmentCard key="card" show={true} />
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50"
                        >
                            <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs font-medium">No hay citas agendadas</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

const ChatDemo = () => {
    const reduceMotion = useReducedMotion()
    const [visibleMessages, setVisibleMessages] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [appointmentConfirmed, setAppointmentConfirmed] = useState(false)
    const [cycleKey, setCycleKey] = useState(0) // Key to reset component state completely

    const messages = [
        {
            id: 1,
            text: "Hola 👋 ¿podría pedir una cita para el jueves?",
            isUser: true,
            delay: 800
        },
        {
            id: 2,
            text: "Claro. ¿Qué servicio necesitas?",
            isUser: false,
            delay: 1400,
            typingDuration: 1200
        },
        {
            id: 3,
            text: "Corte de pelo y barba, por favor 💈",
            isUser: true,
            delay: 1000
        },
        {
            id: 4,
            text: "Perfecto. Tengo disponibilidad el jueves a las 15:30. ¿Te viene bien?",
            isUser: false,
            delay: 1600,
            typingDuration: 1400
        },
        {
            id: 5,
            text: "¡Genial! Ahí estaré 👍",
            isUser: true,
            delay: 1200
        },
        {
            id: 6,
            text: "Cita confirmada para el jueves 15:30. Te avisaremos si se libera un horario mejor. ¡Hasta entonces!",
            isUser: false,
            delay: 1500,
            typingDuration: 1600,
            onShow: () => setAppointmentConfirmed(true)
        }
    ]

    useEffect(() => {
        let isMounted = true
        const timers = []
        let accumulatedTime = 0
        let totalCycleTime = 0

        // Reset state at start of cycle
        setVisibleMessages(0)
        setIsTyping(false)
        setAppointmentConfirmed(false)

        messages.forEach((message, index) => {
            accumulatedTime += message.delay

            // Show typing indicator for bot
            if (!message.isUser && message.typingDuration) {
                const typingTimer = setTimeout(() => {
                    if (isMounted) setIsTyping(true)
                }, accumulatedTime)
                timers.push(typingTimer)
                accumulatedTime += message.typingDuration
            }

            // Show message
            const messageTimer = setTimeout(() => {
                if (isMounted) {
                    setIsTyping(false)
                    setVisibleMessages(index + 1)
                    if (message.onShow) message.onShow()
                }
            }, accumulatedTime)
            timers.push(messageTimer)
        })

        totalCycleTime = accumulatedTime + 4000 // Add 4s pause after interaction finishes

        const loopTimer = setTimeout(() => {
            if (isMounted) {
                setCycleKey(prev => prev + 1) // Trigger re-render to restart
            }
        }, totalCycleTime)
        timers.push(loopTimer)

        return () => {
            isMounted = false
            timers.forEach(clearTimeout)
        }
    }, [cycleKey])

    const messageVariants = {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.9 },
        visible: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30 } }
    }

    return (
        <section className='bg-gradient-to-b from-white to-gray-50 w-full py-16 md:py-24 flex justify-center items-center overflow-hidden'>
            <div className='w-full max-w-5xl px-4 md:px-6'>
                <div className='flex flex-col md:flex-row gap-6 md:gap-8 items-stretch justify-center h-[600px]'>

                    {/* LEFT PANEL: Chat */}
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 h-full flex flex-col'>
                            {/* Chat Header */}
                            <div className='flex items-center mb-6 pb-4 border-b border-gray-50'>
                                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md mr-3'>
                                    <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className='font-bold text-gray-800 text-sm'>Asistente WeLyd</h3>
                                    <p className='text-xs text-green-500 flex items-center gap-1 font-medium'>
                                        <span className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'></span>
                                        En línea
                                    </p>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className='flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar'>
                                <AnimatePresence mode='popLayout'>
                                    {messages.slice(0, visibleMessages).map((message) => (
                                        <motion.div
                                            key={`${cycleKey}-${message.id}`}
                                            className={`flex ${message.isUser ? 'justify-start' : 'justify-end'}`}
                                            initial="hidden"
                                            animate="visible"
                                            variants={messageVariants}
                                            layout
                                        >
                                            <div className={`
                                                max-w-[90%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                                ${message.isUser
                                                    ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                                                    : 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-100'
                                                }
                                            `}>
                                                {message.text}
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            key="typing"
                                            className='flex justify-end'
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <div className='bg-white border border-gray-100 rounded-2xl rounded-tr-sm shadow-sm'>
                                                <TypingIndicator />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Appointment Dashboard */}
                    <div className='w-full md:w-1/2 flex flex-col'>
                        {/* Connection Line (Visual only on desktop) */}
                        <div className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-indigo-200 transition-opacity duration-500 ${appointmentConfirmed ? 'opacity-100' : 'opacity-0'}`}></div>

                        <CalendarPanel appointmentConfirmed={appointmentConfirmed} />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ChatDemo
