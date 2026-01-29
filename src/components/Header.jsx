"use client"
import React from 'react'

const Header = () => {
  return (
    <div className='w-full fixed top-0 backdrop-blur-3xl p-3 text-black flex justify-between items-center z-50 font-light'>
        <div className='w-10'>
            <img className='object-contain' src="./logoWelydAzul.png" alt="WeLyd" />
        </div>
        <a href="#">WeLyd</a>
        <a href="#contact">Contacto</a>
    </div>
  )
}

export default Header