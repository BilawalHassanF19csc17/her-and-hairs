import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logout from './logout';

const NavbarEmp = () => {
  return (
    <><nav>
      <div className='bg-[#DBB5B5] h-[260px] lg:h-[100px]  flex flex-col lg:flex-row pt-[10px] shadow-xl'>
        <div className="logo w-[100%] lg:w-[10%] flex justify-center lg:justify-center items-center">
          <Link href='/dashboard/'>
          <Image className='w-[100px]' src="/image-removebg-preview.png" width={200} height={50} alt='logo' />
          </Link>
        </div>
        <div className="menu w-[100%] lg:w-[80%] flex justify-center lg:justify-center items-center py-[10px]">
          <div className='bg-[#886262] p-[5px] rounded-[20px] text-white'>
          <ul className='flex'>
            <Link href="/dashboard/">
              <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Orders</li>
            </Link>
            <Link href="/dashboard/purchasing">
              <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Purchasings</li>
            </Link>
            <Link href="/dashboard/inventory">
              <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Inventory</li>
            </Link>
            <Link href="/dashboard/shipped">
              <li className='mx-3 hover:border-b-[2px] hover:border-b-solid hover:border-b-[#F1E5D1]'>Shipped</li>
            </Link>
          </ul>
          </div>
          
        </div>
        <div className='Logout w-[100%] lg:w-[10%] flex justify-center lg:justify-center items-center'>
              <Logout/>
        </div>
      </div>
    </nav>
    </>
  );
}

export default NavbarEmp