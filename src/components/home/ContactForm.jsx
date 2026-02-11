"use client"
import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const initialValues = {
    name: '',
    email: '',
    business: '',
    phone: '',
    message: '',
    website: ''
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ContactForm = () => {
    const reduceMotion = useReducedMotion()
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle')
    const [statusMessage, setStatusMessage] = useState('')

    const validate = () => {
        const nextErrors = {}

        if (!values.name.trim()) nextErrors.name = 'Escribe tu nombre.'
        if (!values.email.trim()) nextErrors.email = 'Escribe tu email.'
        if (values.email.trim() && !emailPattern.test(values.email.trim())) {
            nextErrors.email = 'Escribe un email valido.'
        }
        if (!values.message.trim()) nextErrors.message = 'Cuentanos que necesitas.'

        return nextErrors
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => {
            if (!prev[name]) return prev
            const next = { ...prev }
            delete next[name]
            return next
        })

        if (status !== 'idle' && status !== 'submitting') {
            setStatus('idle')
            setStatusMessage('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const nextErrors = validate()
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            return
        }

        setStatus('submitting')
        setStatusMessage('')
        setErrors({})

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })

            const data = await response.json().catch(() => ({}))

            if (!response.ok || !data.ok) {
                throw new Error(data.error || 'No se pudo enviar el formulario.')
            }

            setStatus('success')
            setStatusMessage(data.message || 'Mensaje enviado. Te responderemos pronto.')
            setValues(initialValues)
        } catch (error) {
            setStatus('error')
            setStatusMessage(error.message || 'No se pudo enviar el formulario.')
        }
    }

    const fieldClassName = (fieldName) => `
        w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors duration-200
        ${errors[fieldName]
            ? 'border-rose-300 bg-rose-500/10 text-white placeholder:text-rose-200 focus:border-rose-300'
            : 'border-white/20 bg-white/5 text-white placeholder:text-slate-300 focus:border-white/45'
        }
    `

    return (
        <section id='contact' className='scroll-mt-24 relative bg-[#1C1D3C] w-full py-20 md:py-28 overflow-hidden'>
            <div className='pointer-events-none absolute -top-40 -left-24 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl' aria-hidden='true' />
            <div className='pointer-events-none absolute -bottom-48 -right-16 w-[28rem] h-[28rem] rounded-full bg-indigo-500/20 blur-3xl' aria-hidden='true' />

            <div className='relative max-w-6xl mx-auto px-6'>
                <motion.div
                    className='grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 md:gap-10 lg:gap-12 items-start'
                    initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className='text-white'>
                        <p className='text-[11px] font-semibold tracking-[0.3em] uppercase text-slate-400'>Contacto</p>
                        <h2 className='mt-3 text-3xl md:text-4xl font-semibold leading-tight'>
                            Hablemos de tu negocio
                        </h2>
                        <p className='mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-md'>
                            Si quieres automatizar reservas, mejorar la atencion al cliente o escalar operaciones,
                            enviame un mensaje y te escribo con una propuesta clara.
                        </p>

                        <div className='mt-8 space-y-5'>
                            <div className='border-b border-white/15 pb-4'>
                                <p className='text-xs uppercase tracking-wider text-slate-400'>Email</p>
                                <a href='mailto:hola@welyd.com' className='text-sm md:text-base text-slate-100 hover:text-white transition-colors'>
                                    hola@welyd.com
                                </a>
                            </div>
                            <div className='border-b border-white/15 pb-4'>
                                <p className='text-xs uppercase tracking-wider text-slate-400'>Horario</p>
                                <p className='text-sm md:text-base text-slate-100'>Lunes a Viernes, 09:00 a 18:00</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-4 md:space-y-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label htmlFor='name' className='text-xs font-semibold uppercase tracking-wider text-slate-300'>
                                    Nombre
                                </label>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    value={values.name}
                                    onChange={handleChange}
                                    autoComplete='name'
                                    className={fieldClassName('name')}
                                    placeholder='Tu nombre'
                                    aria-invalid={Boolean(errors.name)}
                                />
                                {errors.name && <p className='text-xs text-rose-200'>{errors.name}</p>}
                            </div>

                            <div className='space-y-2'>
                                <label htmlFor='email' className='text-xs font-semibold uppercase tracking-wider text-slate-300'>
                                    Email
                                </label>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    autoComplete='email'
                                    className={fieldClassName('email')}
                                    placeholder='tu@email.com'
                                    aria-invalid={Boolean(errors.email)}
                                />
                                {errors.email && <p className='text-xs text-rose-200'>{errors.email}</p>}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-2'>
                                <label htmlFor='business' className='text-xs font-semibold uppercase tracking-wider text-slate-300'>
                                    Negocio
                                </label>
                                <input
                                    id='business'
                                    name='business'
                                    type='text'
                                    value={values.business}
                                    onChange={handleChange}
                                    autoComplete='organization'
                                    className={fieldClassName('business')}
                                    placeholder='Nombre del negocio'
                                />
                            </div>

                            <div className='space-y-2'>
                                <label htmlFor='phone' className='text-xs font-semibold uppercase tracking-wider text-slate-300'>
                                    Telefono
                                </label>
                                <input
                                    id='phone'
                                    name='phone'
                                    type='tel'
                                    value={values.phone}
                                    onChange={handleChange}
                                    autoComplete='tel'
                                    className={fieldClassName('phone')}
                                    placeholder='+34 600 000 000'
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='message' className='text-xs font-semibold uppercase tracking-wider text-slate-300'>
                                Mensaje
                            </label>
                            <textarea
                                id='message'
                                name='message'
                                value={values.message}
                                onChange={handleChange}
                                rows={5}
                                className={`${fieldClassName('message')} resize-y min-h-[140px]`}
                                placeholder='Cuentame tu caso y objetivos...'
                                aria-invalid={Boolean(errors.message)}
                            />
                            {errors.message && <p className='text-xs text-rose-200'>{errors.message}</p>}
                        </div>

                        {/* Honeypot field to reduce automated spam */}
                        <input
                            type='text'
                            name='website'
                            value={values.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete='off'
                            className='hidden'
                            aria-hidden='true'
                        />

                        <button
                            type='submit'
                            disabled={status === 'submitting'}
                            className='w-full rounded-2xl bg-white text-[#1C1D3C] py-3.5 text-sm font-semibold transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60'
                        >
                            {status === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
                        </button>

                        {status !== 'idle' && statusMessage && (
                            <p
                                className={`text-sm rounded-xl px-4 py-3 border ${status === 'success'
                                    ? 'bg-emerald-500/10 text-emerald-100 border-emerald-300/35'
                                    : 'bg-rose-500/10 text-rose-100 border-rose-300/35'
                                    }`}
                                role='status'
                            >
                                {statusMessage}
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

export default ContactForm
