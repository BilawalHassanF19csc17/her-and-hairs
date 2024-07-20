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
            setMessage('Successfully Added');
        } else {
            setMessage('Already Exist');
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
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px); /* Safari */
      }
      select {
        -webkit-appearance: none; /* Remove default styling */
        -moz-appearance: none;
        appearance: none;
    }

    .select-wrapper {
        position: relative;
        display: inline-block;
    }

    .select-wrapper::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 10px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #000;
        transform: translateY(-50%);
        pointer-events: none;
    }
      `}
            </style>
            <div className='flex bg-white justify-center h-[500px] items-center'>
                <form onSubmit={addCustomer} className=' w-[300px] lg:w-[600px] 
                h-[400px] rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    {loader&&<Loader/>}
                    <div>
                        <p className='text-center mt-[10px] mb-[10px] italic text-[18px] lg:text-[28px] font-serif'>
                                Get notified for my most awaited Haircare launch<span className='text-[#886262]'>♡</span>
                        </p>
                    </div>
                    <div className='mt-[10px]'>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[245px] lg:w-[500px] h-[40px] pl-[10px]' type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>  
                    <div className='mt-[10px] flex justify-center items-center'>
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className='h-[36px]' >
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[184px] lg:w-[438px] h-[40px] pl-[10px]' type='tel' placeholder='Enter your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className='mt-[10px]'>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] lg:w-[500px] pl-[10px]' type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mt-[10px]'>
                        <button className='bg-[#bf978f] w-[100px]
          h-[30px] my-5 text-white rounded-[15px]'  type='submit' >Submit</button>
                    </div>
                    {message && <p className='text-center text-[12px]'>{message}</p>}
                </form>
            </div>
            <Footer2/>
        </>
    )
}

export default Productlunch