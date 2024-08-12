import Footer2 from '@/components/footer2';
import React from 'react'
import { useRouter } from 'next/router';

const Productlunch = () => {
    const router = useRouter();

    const handleChange = (event) => {
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            router.push(selectedCountry);
        }
    };
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
            <div className='backimg flex justify-center h-[800px] items-center w-full'>
                <form className=' w-[350px] lg:w-[400px] 
                h-[150px] rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4 mt-[20px] bg-[#d0cccc]'>
                    <div className='px-[10px] flex justify-center items-center flex-col'>
                    <p className='text-center mt-[10px] mb-[10px] text-[24px] lg:text-[28px] font-serif text-white'>
                                Select Your Country
                        </p>
                        <select
                            className='h-[39px] bg-white rounded-[5px] border-[2px] border-gray-200'
                            onChange={handleChange}
                        >
                            <option value=''>Select a country</option>
                            <option value='https://herandhair.com'>United States of America</option>
                            <option value='https://herandhair.com'>Canada</option>
                            <option value='https://herandhair.com'>United Kingdom</option>
                            <option value='https://pk.herandhair.com'>Pakistan</option>
                            <option value='https://herandhair.com'>India</option>
                            <option value='https://herandhair.com'>United Arab Emirates</option>
                            <option value='https://herandhair.com'>Malayisa</option>
                            <option value='https://herandhair.com'>Bangladesh</option>
                        </select>
                    </div>
                </form>
            </div>
            <Footer2 />
        </>
    )
}

export default Productlunch