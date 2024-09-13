import Footer2 from '@/components/footer2';
import React from 'react'
import Link from 'next/link';

const Productlunch = () => {

  return (
    <>
      <style jsx>
        {`
      .blurred-background {
        backdrop-filter: blur(60px);
        -webkit-backdrop-filter: blur(60px); /* Safari */
      }

      .backimg{
        background-image: url('/productlaunch.png');
        background-size: cover;
        background-position-x: center;
      }
      `}
      </style>
      <div className='backimg flex justify-center h-[600px] items-center w-full'>
        <div className=' w-[350px] lg:w-[600px] 
    h-[350px] rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4 mt-[20px] bg-[#d0cccc]'>
          <Link href='https://herandhair.com/my-account'>
            <button className='bg-[#bf978f] w-[200px] h-[35px] my-[10px] text-white rounded-[15px]'>
              Drop your review
            </button>
          </Link>
        </div>
      </div>
      <Footer2 />
    </>
  )
}

export default Productlunch