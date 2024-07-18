import React, { useEffect } from 'react'
import Navbar from '@/components/navbar'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '@/components/footer';

const Marketing = () => {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [tabs, setTabs] = useState('customers');
    const [message, setMessage] = useState('');

    const fetchCustomers = async () => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole === 'employee') {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            router.push('/');
        } else {
            const response = await fetch('/api/customer/waiting');
            const data = await response.json();
            if (response.ok) {
                setCustomers(data);
            }
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const showCustomers = () => {
        setTabs('customers');
    }

    const showEmail = () => {
        setTabs('emails');
    }

    const sendMail = async (e) =>{
        setMessage('Sending Emails Please Wait Honey♥️...')
        e.preventDefault();
        const response = await fetch('/api/customer/sendmail',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({subject, text})
        })
        if(response.status === 200){
            const data = await response.json();
            setMessage(`${data.counter} Emails are sent Successfully♥️`)
        } else {
            setMessage('Sorry Sweetheart could not send Emails :(')
        }
        setSubject('');
        setText('');
    }
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
            <Navbar />
            <div className='flex justify-center'>
                <div className='shadow-2xl m-4 bg-white mt-[15px] rounded-[30px] w-[200px] flex p-[3px]'>
                    <button onClick={showCustomers} className={`${tabs === 'customers' ? 'bg-[#886262] text-white' : ''} w-[50%] p-[5px] rounded-[30px]`}>Customers</button>
                    <button onClick={showEmail} className={`${tabs === 'emails' ? 'bg-[#886262] text-white' : ''} w-[50%] p-[5px] rounded-[30px]`}>Email</button>
                </div>
            </div>
            {tabs === 'customers' && <div className='flex justify-center items-center lg:h-[400px] h-[500px] w-[100%]'>
                <ul className='w-[400px] lg:w-[900px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[140px] mb-[30px]'>Customer Details</p>
                    {customers.map((customer) => (
                        <li className='w-[100%]' key={customer.email}>
                            <div className=' flex justify-start flex-wrap lg:justify-around'>
                                <p>Name: {customer.name}</p>
                                <p>Email: {customer.email}</p>
                                <p>Phone: {customer.countrycode} {customer.phone}</p>
                            </div>
                            <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px]'></div>
                        </li>
                    ))}
                </ul>
            </div>}
            {tabs === 'emails' && <div className='flex justify-center items-center lg:h-[600px] h-[500px] w-[100%]'>
                <form onSubmit={sendMail} className='w-[400px] lg:w-[600px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className=' rounded-[15px] pl-[0px] text-white bg-[#886262] text-[15px] w-[140px] mb-[30px] text-center'>Write your Email</p>
                    <div>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[370px] lg:w-[500px] h-[40px] text-center' type='text' placeholder='Enter Subject' value={subject} onChange={(e)=>setSubject(e.target.value)} required />
                    </div>
                    <div>
                        <textarea
                            className='border-2 border-grey rounded-[5px] my-2 text-center w-full'
                            cols={57}
                            rows={10}
                            placeholder='Type your magical mail'
                            required
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                        />
                    </div>
                    <div className='mt-[10px]'>
                        <button className='bg-[#886262] w-[100px]
          h-[30px] my-5 text-white rounded-[15px]'  type='submit' >Submit</button>
                    </div>
                    <div>
                        {message && <p className="text-black italic text-center text-[12px]">{message}</p>}
                    </div>
                </form>
            </div>}
            <Footer />
        </>
    )
}

export default Marketing