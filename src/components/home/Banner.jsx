"use client"
import React from 'react'

const Banner = () => {
    return (
        <section className='bg-white w-full h-full flex flex-col justify-center items-center'>
            <div className='text-black text-center font-bold py-50 md:py-40 lg:py-10'>
                <h1 className='text-[70px] md:text-[150px] lg:text-[250px] transition-all duration-300 ease-in-out -my-10'>WeLyd</h1>
                <h2 className='text-[50px] md:text-[100px] lg:text-[150px] transition-all duration-300 ease-in-out mt-1 md:-mt-15 lg:-mt-25'>Automations</h2>
            </div>
            <div className='w-full flex flex-col justify-center items-center h-auto relative mt-10'>
                <img className='absolute w-90 bottom-40 md:bottom-30 lg:bottom-10 md:w-130 lg:w-150' src="/iphone17Portal.png" alt="" />
                <div className='w-[95%] m-auto bg-sky-300 h-[400px] rounded-[50px]'>
                </div>
            </div>
        </section>
    )
}

export default Banner