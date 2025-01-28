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
                            <option value='https://herandhair.com'>Austria</option>
                            <option value='https://herandhair.com'>Bangladesh</option>
                            <option value='https://herandhair.com'>Behrain</option>
                            <option value='https://herandhair.com'>Canada</option>
                            <option value='https://herandhair.com'>Czech Repulic</option>
                            <option value='https://herandhair.com'>Finland</option>
                            <option value='https://herandhair.com'>France</option>
                            <option value='https://herandhair.com'>Germany</option>
                            <option value='https://herandhair.com'>Greece</option>
                            <option value='https://herandhair.com'>Hong Kong</option>
                            <option value='https://herandhair.com'>Kenya</option>
                            <option value='https://herandhair.com'>Indonesia</option>
                            <option value='https://herandhair.com'>Italy</option>
                            <option value='https://my.shp.ee/v8XY1tR'>Malaysia</option>
                            <option value='https://herandhair.com'>Netherlands</option>
                            <option value='https://herandhair.com'>Norway</option>
                            <option value='https://pk.herandhair.com'>Pakistan</option>
                            <option value='https://herandhair.com'>Phillipines</option>
                            <option value='https://herandhair.com'>Poland</option>
                            <option value='https://herandhair.com'>Romania</option>
                            <option value='https://herandhair.com'>Saudi Arabia</option>
                            <option value='https://herandhair.com'>South Africa</option>
                            <option value='https://herandhair.com'>Sri Lanka</option>
                            <option value='https://herandhair.com'>Sweden</option>
                            <option value='https://herandhair.com'>Spain</option>
                            <option value='https://herandhair.com'>SwitzerLand</option>
                            <option value='https://herandhair.com'>Turkey</option>
                            <option value='https://herandhair.com'>United Arab Emirates</option>
                            <option value='https://herandhair.com'>United Kingdom</option>
                            <option value='https://herandhair.com'>United States of America</option>
                            <option value='https://herandhair.com'>Oman</option>
                        </select>
                    </div>
                </form>
            </div>
            <Footer2 />
        </>
    )
}

export default Productlunch
