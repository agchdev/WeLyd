"use client"
import React from 'react'

const Banner = () => {
  return (
    <section className='bg-white w-full h-full flex flex-col justify-center items-center'>
        <div className='text-black text-center font-bold pt-20 lg:pt-10'>
            <h1 className='text-[70px] md:text-[150px] lg:text-[250px] transition-all duration-300 ease-in-out -my-8'>WeLyd</h1>
            <h2 className='text-[50px] md:text-[100px] lg:text-[150px] transition-all duration-300 ease-in-out md:-mt-15 lg:-mt-25'>Automations</h2>
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
                <img className='relative w-150 ' src="/iphone17Portal.png" alt="" />
            <div className='w-[85%] m-auto bg-sky-300 h-[400px] mt-30 rounded-[50px]'>
        </div>

        </div>
    </section>
  )
}

export default Banner