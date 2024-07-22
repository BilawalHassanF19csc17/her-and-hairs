import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import Navbar from '../../components/navbar';
import { useState } from 'react';
import Footer from '@/components/footer';

const Index = () => {
  const router = useRouter();
  const [sales, setSales] = useState([]);
  const [salesshipped, setSalesshipped] = useState([]);
  const [tabs, setTabs] = useState('pending');
  const [messageP, setMessageP] = useState('');

  const fetchSales = async () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole === 'employee') {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      router.push('/');
    } else {
      const responsePending = await fetch('/api/dashboard/salesP');
      if (responsePending.status === 400) {
        setMessageP('Yay Honey! No pending orders');
      }
      const responseShipped = await fetch('/api/dashboard/salesS');
      const dataPending = await responsePending.json();
      const dataShipped = await responseShipped.json();

      if (dataPending.length > 0) {
        const formattedDataPending = dataPending.map(item => ({
          ...item,
          formattedCreatedAt: new Date(item.date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          })
        }));
        formattedDataPending.reverse();
        setSales(formattedDataPending);
      }

      const formattedDataShipped = dataShipped.map(item => ({
        ...item,
        formattedCreatedAt: new Date(item.date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        }),
        formattedUpdatedAt: new Date(item.updatedAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })
      }));
      formattedDataShipped.reverse();
      setSalesshipped(formattedDataShipped);
    }
  }

  const pendingOrder = () => {
    setTabs('pending');
  }

  const shippedOrder = () => {
    setTabs('shipped');
  }


  const updateStatus = async (id) => {
    const response = await fetch('/api/dashboard/salesS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    if (response.status === 200) {
      fetchSales();
    }
  }

  useEffect(() => {
    fetchSales();
  }, [router])
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
      <div>
        <div className='flex justify-center'>
          <div className='shadow-2xl m-4 bg-white mt-[15px] rounded-[30px] w-[200px] flex p-[3px]'>
            <button onClick={pendingOrder} className={`${tabs === 'pending' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Pending</button>
            <button onClick={shippedOrder} className={`${tabs === 'shipped' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Shipped</button> 
          </div>
        </div>
        {tabs === 'pending' && (
          <ul className='shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]'>
            {messageP && <p className='text-center'>{messageP}</p>}
            {sales.map((data) => (
              <li className="px-[10px] mb-[55px]" key={data.id}>
                <div className="my-[20px] border-[1px] border-black text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[400px]">
                  <p>{data.formattedCreatedAt}</p>
                </div>
                <div className='flex flex-col lg:flex-row justify-around lg:mt-[40px]'>
                  <div>
                    <p className=' rounded-[15px] border-[1px] border-black pl-[10px] text-black bg-[#f8f3eb] text-[15px] w-[112px] mb-[10px]'>Order Details</p>
                    <p>Order No: {data.id}</p>
                    <p>Total: {data.total}</p>
                    <p>Quantity: {data.quantity}</p>
                    <p>Status: {data.status}</p>
                  </div>
                  <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                  <div>
                    <p className=' rounded-[15px] border-[1px] border-black pl-[10px] text-black bg-[#f8f3eb] text-[15px] w-[145px] mb-[10px]'>Customer Details</p>
                    <p>Customer: {data.customer}</p>
                    <p>Address: {data.address}</p>
                    <p>City: {data.city}</p>
                    <p>State: {data.state}</p>
                    <p>Postcode: {data.postcode}</p>
                    <p>Country: {data.country}</p>
                  </div>
                  <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                  <div>
                    <p className=' rounded-[15px] border-[1px] border-black pl-[10px] text-black bg-[#f8f3eb] text-[15px] w-[130px] mb-[10px]'>Contact Details</p>
                    <p>Email: {data.email}</p>
                    <p>Phone: {data.phone}</p>
                    <div className='flex justify-center'>
                      <button onClick={() => updateStatus(data.id)} className='border-[1px] border-black lg:mt-[50px] mt-[20px] text-[15px] px-[30px] py-[5px] text-black bg-[#f8f3eb] rounded-[20px] cursor-pointer'>Ship</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {tabs === 'shipped' && (
          <ul className='shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]'>
            {salesshipped.map((data) => (
              <li className="px-[10px] mb-[55px]" key={data.id}>
                <div className="my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[400px]">
                  <p>{data.formattedCreatedAt}</p>
                </div>
                <div className='flex flex-col lg:flex-row justify-around lg:mt-[40px]'>
                  <div>
                    <p className=' rounded-[15px] pl-[10px] text-black bg-[#f8f3eb] text-[15px] w-[112px] mb-[10px]'>Order Details</p>
                    <p>Order No: {data.id}</p>
                    <p>Total: {data.total}</p>
                    <p>Quantity: {data.quantity}</p>
                    <p>Status: {data.status}</p>
                    <p>Shipped At: {data.formattedUpdatedAt}</p>
                  </div>
                  <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                  <div>
                    <p className=' rounded-[15px] pl-[10px] text-black bg-[#f8f3eb] text-[15px] w-[145px] mb-[10px]'>Customer Details</p>
                    <p>Customer: {data.customer}</p>
                    <p>Address: {data.address}</p>
                    <p>City: {data.city}</p>
                    <p>State: {data.state}</p>
                    <p>Postcode: {data.postcode}</p>
                    <p>Country: {data.country}</p>
                  </div>
                  <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                  <div>
                    <p className=' rounded-[15px] pl-[10px] text-black bg-[#f8f3eb] text-[15px] w-[130px] mb-[10px]'>Contact Details</p>
                    <p>Email: {data.email}</p>
                    <p>Phone: {data.phone}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
      <Footer/>
    </>
  )
}

export default Index