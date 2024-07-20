import Footer2 from '@/components/footer2';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import Loader from '@/components/loader';

const Productlunch = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState('+93');
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const fetchCountries = async () => {
        const response = await fetch('/countries.json');
        const data = await response.json();
        setCountries(data);
    }

    const addCustomer = async (e) => {
        e.preventDefault();
        setLoader(true);
        const response = await fetch('/api/customer/waiting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, phone, countryCode })
        })
        if (response.status === 200) {
            setMessage('Successfully added');
        } else {
            setMessage('The details you have added already exist');
        }
        setName('');
        setCountryCode('');
        setEmail('');
        setPhone('');
    }

    useEffect(() => {
        fetchCountries();
    }, [])

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
                <form onSubmit={addCustomer} className=' w-[350px] lg:w-[600px] 
                h-[350px] rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4 mt-[20px] bg-[#d0cccc]'>
                    {loader&&<Loader/>}
                    <div className='px-[10px]'>
                        <p className='text-center mt-[10px] mb-[10px] italic text-[24px] lg:text-[28px] font-serif text-white'>
                                Get notified for my most awaited Haircare launch<span className='text-white'>♡</span>
                        </p>
                    </div>
                    <div className='mt-[0px]'>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]' type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>  
                    <div className='mt-[0px] flex justify-center items-center'>
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className='h-[39px] bg-white rounded-[5px] border-[2px] border-gray-200' >
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[200px] lg:w-[422px] h-[40px] pl-[10px]' type='tel' placeholder='Enter your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className='mt-[0px]'>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[300px] h-[40px] lg:w-[500px] pl-[10px]' type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-[0px] '>
                        <button className='bg-[#bf978f] w-[100px]
          h-[30px] my-[10px] text-white rounded-[15px]'  type='submit' >Submit</button>
                    </div>
                    {message && <p className='text-center text-white text-[12px]'>{message}</p>}
                </form>
            </div>
            <Footer2/>
        </>
    )
}

export default Productlunch