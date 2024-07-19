import React from 'react'
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();
  const logoutNow = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    router.push('/');
  }
  return (
    <div className='flex justify-center my-[20px]'>
        <button className='flex justify-center items-center bg-[#e4e4e4] w-[100px]
          h-[30px] my-5 text-black rounded-[15px]' onClick={logoutNow}><p className='text-[15px] mr-[10px]'>Logout</p><svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" >
      <path
        stroke="currentColor"
        d="M13.5 7.5l-3 3.25m3-3.25l-3-3m3 3H4m4 6H1.5v-12H8"
      />
    </svg></button>
    </div>
  )
}

export default Logout