"use client"
import React from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'

const Banner = () => {
    const reduceMotion = useReducedMotion()
    const phoneControls = useAnimationControls()

    const textContainer = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.12 }
        }
    }

    const textItem = {
        hidden: reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 20, filter: 'blur(6px)' },
        show: reduceMotion
            ? { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
            : { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } }
    }

    React.useEffect(() => {
        if (reduceMotion) return
        let active = true

        const run = async () => {
            await phoneControls.start('enter')
            if (!active) return
            phoneControls.start('float')
        }

        run()
        return () => {
            active = false
            phoneControls.stop()
        }
    }, [phoneControls, reduceMotion])

    const phoneVariants = {
        hidden: { opacity: 0, y: 40 },
        enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        float: { y: [0, -14, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
    }

    const mobileReveal = {
        hidden: { opacity: 0, scaleX: 0 },
        show: {
            opacity: 1,
            scaleX: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    }

    const enableReveal = !reduceMotion

    return (
        <section className='bg-white w-full h-full flex flex-col justify-center items-center pb-20'>
            <motion.div
                className='relative z-10 text-black text-center font-bold py-50 md:py-40 lg:py-10'
                variants={textContainer}
                initial='hidden'
                whileInView='show'
                viewport={{ once: true, amount: 0.6 }}
            >
                <motion.h1 className='text-[120px] md:text-[200px] lg:text-[250px] -my-10' variants={textItem}>
                    WeLyd
                </motion.h1>
                <motion.h2 className='text-[40px] md:text-[100px] lg:text-[130px] mt-8 md:-mt-10 lg:-mt-15' variants={textItem}>
                    El futuro es ahora
                </motion.h2>
            </motion.div>

            <div className='w-full flex flex-col justify-center items-center h-auto relative mt-10'>
                {/* Phone Image (Floating) */}
                <motion.img
                    className='absolute z-30 w-120 bottom-120 md:bottom-100 lg:bottom-50 md:w-130 lg:w-180'
                    src="/iphone17Portal.png"
                    alt="App Interface"
                    variants={phoneVariants}
                    initial={reduceMotion ? { opacity: 1, y: 0 } : 'hidden'}
                    animate={reduceMotion ? { opacity: 1, y: 0 } : phoneControls}
                />

                {/* Blue Background Container */}
                <motion.div
                    className='z-0 w-[95%] m-auto bg-[#1C1D3C] h-[400px] md:h-[500px] max-w-[1400px] rounded-[50px] relative overflow-hidden flex items-end justify-between px-10 pb-10'
                    style={enableReveal ? { transformOrigin: 'center' } : undefined}
                    variants={enableReveal ? mobileReveal : undefined}
                    initial={enableReveal ? 'hidden' : false}
                    whileInView={enableReveal ? 'show' : undefined}
                    viewport={enableReveal ? { once: true, amount: 0.4 } : undefined}
                >
                    {/* WELYD Text (Bottom Left) */}
                    <div className='relative z-10'>
                        <h3 className='text-white text-4xl md:text-6xl font-bold tracking-tighter opacity-90'>
                            WELYD<span className='text-xl align-top ml-1'>TM</span>
                        </h3>
                        <p className='text-gray-400 text-xs md:text-sm max-w-[200px] mt-2 leading-relaxed'>
                            WeLyd es la solución digital para gestionar tu negocio de forma inteligente.
                        </p>
                    </div>

                    {/* Client Image (Right Side with Perspective) */}
                    <div className='absolute right-0 bottom-0 h-[90%] w-[40%] md:w-[35%] z-0'>
                        <img
                            src="/clientes.png"
                            alt="Happy Client"
                            className="w-full h-full object-cover object-center mask-image-gradient"
                            style={{
                                maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
                            }}
                        />
                    </div>
                </motion.div>

                {/* Bottom Text Section */}
                <div className='w-[90%] max-w-[1200px] mx-auto mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
                    <div className='flex flex-col gap-4'>
                        <h3 className='text-4xl md:text-5xl font-medium text-black leading-tight'>
                            Tu negocio,<br />
                            <span className='text-gray-400'>gestionado con IA.</span>
                        </h3>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <span className='text-xs font-bold tracking-widest text-[#1C1D3C] uppercase'>[OVERVIEW]</span>
                        <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
                            WeLyd simplifica la gestión de citas y clientes mediante inteligencia artificial.
                            Automatiza procesos, optimiza tu agenda y ofrece una experiencia premium a tus usuarios.
                            Diseñado para escalar contigo y adaptarse a las necesidades de tu empresa en tiempo real.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
