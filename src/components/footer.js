import React from 'react'
import Image from 'next/image'

const Footer = () => {
    const currentdate = new Date().getFullYear();
  return (
    <>
    <footer className='flex flex-col justify-center bg-[#f8f3eb] mt-[100px]'>
        <div className='flex justify-center'>
            <Image width={150} height={150} alt='logo' src={'/image-removebg-preview.png'}/>
        </div>
        <div className='mb-[50px]'>
            <p className='text-center'>© {currentdate} All rights reserved by I Connect Solutions</p>
        </div>
    </footer>
    </>
  )
}

export default Footer