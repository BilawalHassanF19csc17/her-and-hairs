import Footer2 from '@/components/footer2';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';

const Affiliate = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [yt, setYt] = useState('');
  const [ig, setIg] = useState('');
  const [fb, setFb] = useState('');
  const [web, setWeb] = useState('');
  const [message, setMessage] = useState('');
  const [youtube, setYoutube] = useState(false);
  const [insta, setInsta] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [website, setWebsite] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countryCode, setCountryCode] = useState('Country');

  const fetchCountries = async () => {
    const response = await fetch('/countries.json');
    const data = await response.json();
    setCountries(data);
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  const handleCheckboxYT = () => {
    setYoutube(!youtube);
  };

  const handleCheckboxIG = () => {
    setInsta(!insta);
  };

  const handleCheckboxFB = () => {
    setFacebook(!facebook);
  };

  const handleCheckboxWeb = () => {
    setWebsite(!website);
  };

  const addAffiliate = async (e) => {
    e.preventDefault();
    document.getElementById('submitBtn').disabled = true;
        const response = await fetch('/api/customer/affiliate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, countryCode, yt, ig, fb, web })
        })
        if (response.status === 200) {
            setMessage('Thank you for registering! We will be in touch soon.');
            document.getElementById('submitBtn').disabled = false;
        } else {
            setMessage('The details you have added already exist');
            document.getElementById('submitBtn').disabled = false;
        }
        setName('');
        setCountryCode('');
        setEmail('');
        setFb('');
        setIg('');
        setYt('');
        setWeb('');
  }

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
      <div className='backimg flex justify-center h-[850px] items-center w-full'>
        <div className=' w-[350px] lg:w-[600px] 
    h-[800px] rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4 mt-[20px] bg-[#d0cccc]'>
          <form onSubmit={addAffiliate} className=' w-[350px] lg:w-[600px] 
                h-[550px] rounded-[10px] flex justify-center items-center flex-col '>
            <div className='px-[10px]'>
              <p className='text-center mt-[10px] mb-[10px] italic text-[24px] lg:text-[28px] font-serif text-white'>
                Become Affiliate<span className='text-white'>♡</span>
              </p>
            </div>
            <div className='mt-[0px]'>
              <input className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Full Name' required />
            </div>
            <div className='mt-[0px]'>
              <input className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            </div>
            <div className='mt-[0px] flex justify-center items-center'>
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className='h-[39px] bg-white rounded-[5px] border-[2px] w-[300px] lg:w-[500px] border-gray-200 my-2' >
                <option disabled className='text-slate-300'>Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mt-[20px] flex flex-col'>
              <div className='flex items-center'>
                <input
                  className='border-2 border-grey rounded-[5px] my-2 h-[20px] w-[20px] pl-[10px]'
                  type='checkbox'
                  onChange={handleCheckboxYT}
                /><label className='px-2 text-white'>YouTube</label>
              </div>
              <input
                className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]'
                type='text'
                placeholder='YouTube link'
                value={yt} 
                onChange={(e) => setYt(e.target.value)}
                disabled={!youtube}
              />
            </div>
            <div className='mt-[20px] flex flex-col'>
              <div className='flex items-center'>
                <input
                  className='border-2 border-grey rounded-[5px] my-2 h-[20px] w-[20px] pl-[10px]'
                  type='checkbox'
                  onChange={handleCheckboxIG}
                /><label className='px-2 text-white'>Instagram</label>
              </div>
              <input
                className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]'
                type='text'
                placeholder='Insta link'
                value={ig} 
                onChange={(e) => setIg(e.target.value)}
                disabled={!insta}
              />
            </div>
            <div className='mt-[20px] flex flex-col'>
              <div className='flex items-center'>
                <input
                  className='border-2 border-grey rounded-[5px] my-2 h-[20px] w-[20px] pl-[10px]'
                  type='checkbox'
                  onChange={handleCheckboxFB}
                /><label className='px-2 text-white'>Facebook</label>
              </div>
              <input
                className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]'
                type='text'
                placeholder='Facebook link'
                value={fb} 
                onChange={(e) => setFb(e.target.value)}
                disabled={!facebook}
              />
            </div>
            <div className='mt-[20px] flex flex-col'>
              <div className='flex items-center'>
                <input
                  className='border-2 border-grey rounded-[5px] my-2 h-[20px] w-[20px] pl-[10px]'
                  type='checkbox'
                  onChange={handleCheckboxWeb}
                /><label className='px-2 text-white'>website</label>
              </div>
              <input
                className='border-2 border-grey rounded-[5px] my-2 w-[300px] lg:w-[500px] h-[40px] pl-[10px]'
                type='text'
                placeholder='Website link'
                value={web} 
                onChange={(e) => setWeb(e.target.value)}
                disabled={!website}
              />
            </div>
            <div className='flex items-center w-[300px] lg:w-[500px] justify-center'>
              <input
                className='border-2 border-grey rounded-[5px] my-2 h-[20px] w-[12px] pl-[10px]'
                type='checkbox'
                required
              /><label className='px-2 text-white text-[10px]'><Link href={'https://herandhair.com/privacy-policy/'} target='_blank'>Affiliate Terms Agreement</Link></label>
            </div>
            <div className='mb-[0px] '>
              <button id='submitBtn' className='bg-[#bf978f] w-[100px]
          h-[30px] my-[10px] text-white rounded-[15px]'  type='submit' >Submit</button>
            </div>
            {message && <p className='text-center text-white text-[15px]'>{message}</p>}
          </form>
        </div>
      </div>
      <Footer2 />
    </>
  )
}

export default Affiliate