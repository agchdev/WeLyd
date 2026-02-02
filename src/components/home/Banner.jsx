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
        <section className='bg-white w-full h-full flex flex-col justify-center items-center'>
            <motion.div
                className='relative z-10 text-black text-center font-bold py-50 md:py-40 lg:py-10'
                variants={textContainer}
                initial='hidden'
                whileInView='show'
                viewport={{ once: true, amount: 0.6 }}
            >
                <motion.h1 className='text-[70px] md:text-[150px] lg:text-[250px] -my-10' variants={textItem}>
                    WeLyd
                </motion.h1>
                <motion.h2 className='text-[30px] md:text-[60px] lg:text-[90px] mt-8 md:-mt-10 lg:-mt-15' variants={textItem}>
                    Automatiza, Analiza, Crece
                </motion.h2>
            </motion.div>
            <div className='w-full flex flex-col justify-center items-center h-auto relative mt-10'>
                <motion.img
                    className='absolute z-30 w-90 bottom-40 md:bottom-30 lg:bottom-10 md:w-130 lg:w-150'
                    src="/iphone17Portal.png"
                    alt=""
                    variants={phoneVariants}
                    initial={reduceMotion ? { opacity: 1, y: 0 } : 'hidden'}
                    animate={reduceMotion ? { opacity: 1, y: 0 } : phoneControls}
                />
                <motion.div
                    className='z-0 w-[95%] m-auto bg-sky-300 h-[400px] max-w-[1200px] rounded-[50px]'
                    style={enableReveal ? { transformOrigin: 'center' } : undefined}
                    variants={enableReveal ? mobileReveal : undefined}
                    initial={enableReveal ? 'hidden' : false}
                    whileInView={enableReveal ? 'show' : undefined}
                    viewport={enableReveal ? { once: true, amount: 0.4 } : undefined}
                />
            </div>
        </section>
    )
}

export default Banner
