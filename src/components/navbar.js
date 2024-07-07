import React from 'react';
import Link from 'next/link';
import AddUser from '@/components/adduser'
import Logout from '@/components/logout'
import PurchasingCost from '@/components/purchasingCost'
import Image from 'next/image'
import { useState } from 'react';
import UpdatePassword from './updatePassword';


const Navbar = () => {
  const [active,setActive] = useState(false);
  return (
    <>
    <style jsx>{`
    .child{
      left: -100%;
      transition: left 0.5s ease-in-out;
    }

    .child.active {
      left: 0;
    }

    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    } 
    
    .blurred-background {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px); /* Safari */
    }
    `}
    </style>
    <nav>
      <div className='bg-[#DBB5B5] h-[205px] lg:h-[100px] flex flex-col lg:flex-row pt-[10px] shadow-xl'>
        <div className="logo w-[100%] lg:w-[10%] flex justify-center lg:justify-center items-center">
          <Link href='/admin/'>
            <Image className='w-[100px]' src="/image-removebg-preview.png" width={200} height={50} alt='logo' />
          </Link>
        </div>
        <div className="menu w-[100%] lg:w-[80%] flex justify-center lg:justify-center items-center py-[10px]">
          <div className='bg-[#886262] p-[5px] rounded-[20px] text-white'>
            <ul className='flex'>
              <Link href="/admin/">
                <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Sales</li>
              </Link>
              <Link href="/admin/purchasing">
                <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Purchasing</li>
              </Link>
              <Link href="/admin/inventory">
                <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Inventory</li>
              </Link>
              <Link href="/admin/finance">
                <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Finance</li>
              </Link>
            </ul>
          </div>

        </div>
        <div className='Logout w-[100%] lg:w-[10%] flex justify-center lg:justify-center items-center'>
          <ul>
              <li className=' flex items-center hover:border-b-[2px] hover:border-b-solid hover:border-b-[#987070] cursor-pointer' onClick={()=>setActive(!active)} >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  className='mr-[5px]'
                >
                  <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg><span>Settings</span></li>
          </ul>
        </div>
      </div>
    </nav>
      <div className='relative mt-[0px] lg:mt-[0px]'>
        <div id="childDiv" className={`w-[430px] absolute ${active ? 'active': ' '} child z-20 blurred-background  lg:bg-opacity-20 p-4 mb-4 rounded-[10px] border-[1px] border-black overflow-y-auto  max-h-[600px] lg:max-h-[680px] no-scrollbar `}>
          <div className='flex justify-center py-[30px] flex-col'>
            <div className='flex justify-center'>
              <div className='border-[#f2e2e2] border-[2px] rounded-[100px]'>
                <Image className='rounded-[100px]' src={'/admin.jpeg'}
                  width={100} height={100} alt='profile' />
              </div>
            </div>
            <p className='text-center mt-[5px] text-[30px]'>Rida Younas </p>
            <p className='text-center mt-[5px] text-[15px]'>Founder & CEO</p>
          </div>
          <AddUser />
          <PurchasingCost />
          <UpdatePassword/>
          <Logout />
        </div>
      </div>
    </>
  );
}

export default Navbar