import Footer from '@/components/footer';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';

const Productlunch = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState('');
    const [message, setMessage] = useState('');

    const fetchCountries = async () => {
        const response = await fetch('/countries.json');
        const data = await response.json();
        setCountries(data);
    }

    const addCustomer = async (e) => {
        e.preventDefault();
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
      `}
            </style>
            <div className='flex justify-center h-[500px] items-center'>
                <form className=' w-[300px] lg:w-[600px] 
                h-[400px] rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <div>
                        <p className='text-center mb-[10px] italic font-bold text-[18px] lg:text-[24px] font-serif'>
                                Get notified for my most awaited Haircare launch<span className='text-[#886262]'>♡</span>
                        </p>
                    </div>
                    <div className='mt-[10px]'>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[245px] lg:w-[500px] h-[40px] text-center' type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='mt-[10px] flex justify-center items-center'>
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className='h-[36px]' >
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[170px] lg:w-[420px] h-[40px] text-center' type='tel' placeholder='Enter your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className='mt-[10px]'>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] lg:w-[500px] text-center' type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mt-[10px]'>
                        <button className='bg-[#886262] w-[100px]
          h-[30px] my-5 text-white rounded-[15px]'  type='submit' onClick={addCustomer}>Submit</button>
                    </div>
                    {message && <p className='text-center text-[12px]'>{message}</p>}
                </form>
            </div>
            <Footer/>
        </>
    )
}

export default Productlunch