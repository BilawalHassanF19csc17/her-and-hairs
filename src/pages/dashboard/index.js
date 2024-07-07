import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import NavbarEmp from '@/components/navbarEmp';
import Footer from '@/components/footer';

const index = () => {
  const router = useRouter();
  const [sales, setSales] = useState([]);
  const [saleRender, setSaleRender] = useState(true)
  const [orderRender, setOrderRender] = useState(false)
  const [selectedSales, setSelectedSales] = useState([])
  const [selectedDate, setSelectedDate] = useState('');
  const [messageP, setMessageP] = useState('');
  const [id, setId] = useState('');
  const [orderID, setOrderID]= useState([]);

  const fetchSales = async () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole === 'admin') {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      router.push('/');
    } else {
      const responsePending = await fetch('/api/dashboard/salesP');
      if (responsePending.status === 400) {
        setMessageP('No pending orders');
      }
      const dataPending = await responsePending.json();

      if (dataPending.length > 0) {
        const formattedDataPending = dataPending.map(item => ({
          ...item,
          formattedCreatedAt: new Date(item.date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          formattedCreatedTime: new Date(item.date).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          }),
        }));
        formattedDataPending.reverse();
        setSales(formattedDataPending);
      }
    }
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

  const selectDate = (event) => {
    const date = event.target.value;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    setSelectedDate(formattedDate);

    const salesDate = sales.filter((item) => item.formattedCreatedAt === formattedDate);
    if (salesDate.length > 0) {
      setSelectedSales(salesDate);
      setSaleRender(false);
    }
  }

  useEffect(() => {
    fetchSales();
  }, [router])

  const findOrder = (e) =>{
    e.preventDefault();
    const findId = sales.filter((item) => item.id === id);
    if(findId.length > 0){
      console.log(findId);
      setOrderID(findId);
      setOrderRender(true)
    }else{
      alert('No record Found');
  }
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
      <NavbarEmp />
      <div>
        <div className='flex flex-col justify-center mt-[20px]'>
          <div className='flex justify-center items-center'>
            <input className='rounded-[20px] p-[3px]' type='date' value={selectedDate} onChange={selectDate} />
            <button className='rounded-[15px] ml-[5px] px-[3px] text-white bg-[#886262] text-[15px] w-[70px] ' onClick={() => setSaleRender(true)}>Cancel</button>
          </div>
          <div className='flex justify-center items-center mt-[20px]'>
              <input required className='border-2 border-grey rounded-[50px] my-2 w-[245px] h-[40px] text-center' type='text' placeholder='Enter order ID' value={id} onChange={(e) => setId(e.target.value)} />
              <button className='bg-[#886262] w-[100px]
          h-[30px] text-white rounded-[15px] ml-[5px]' onClick={findOrder}>Find</button>
          </div>
        </div>
        {orderRender && <ul className='shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]'>
          <p className="my-[10px] text-center bg-[#886262] rounded-[15px] text-white w-[125px] mx-auto">Order ID: {id}</p>
          {orderRender && orderID.map((data) => (
            <li className="px-[10px] mb-[55px]" key={data.id}>
              <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                <p>{data.formattedCreatedAt} {data.formattedCreatedTime}</p>
              </div>
              <div className='flex flex-col lg:flex-row justify-around lg:mt-[40px]'>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[112px] mb-[10px]'>Order Details</p>
                  <p>Order No: {data.id}</p>
                  <p>Total: {data.total}</p>
                  <p>Quantity: {data.quantity}</p>
                  <p>Status: {data.status}</p>
                </div>
                <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[145px] mb-[10px]'>Customer Details</p>
                  <p>Customer: {data.customer}</p>
                  <p>Address: {data.address}</p>
                  <p>City: {data.city}</p>
                  <p>State: {data.state}</p>
                  <p>Postcode: {data.postcode}</p>
                  <p>Country: {data.country}</p>
                </div>
                <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[130px] mb-[10px]'>Contact Details</p>
                  <p>Email: {data.email}</p>
                  <p>Phone: {data.phone}</p>
                  <div className='flex justify-center'>
                    <button onClick={() => updateStatus(data.id)} className='lg:mt-[50px] mt-[20px] text-[15px] px-[30px] py-[5px] text-white bg-[#886262] rounded-[20px] cursor-pointer'>Ship</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>}
        {!saleRender && <ul className='shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]'>
          <p className="my-[10px] text-center bg-[#886262] rounded-[15px] text-white w-[105px] mx-auto">{selectedDate}</p>
          {!saleRender && selectedSales.map((data) => (
            <li className="px-[10px] mb-[55px]" key={data.id}>
              <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                <p>{data.formattedCreatedAt} {data.formattedCreatedTime}</p>
              </div>
              <div className='flex flex-col lg:flex-row justify-around lg:mt-[40px]'>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[112px] mb-[10px]'>Order Details</p>
                  <p>Order No: {data.id}</p>
                  <p>Total: {data.total}</p>
                  <p>Quantity: {data.quantity}</p>
                  <p>Status: {data.status}</p>
                </div>
                <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[145px] mb-[10px]'>Customer Details</p>
                  <p>Customer: {data.customer}</p>
                  <p>Address: {data.address}</p>
                  <p>City: {data.city}</p>
                  <p>State: {data.state}</p>
                  <p>Postcode: {data.postcode}</p>
                  <p>Country: {data.country}</p>
                </div>
                <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[130px] mb-[10px]'>Contact Details</p>
                  <p>Email: {data.email}</p>
                  <p>Phone: {data.phone}</p>
                  <div className='flex justify-center'>
                    <button onClick={() => updateStatus(data.id)} className='lg:mt-[50px] mt-[20px] text-[15px] px-[30px] py-[5px] text-white bg-[#886262] rounded-[20px] cursor-pointer'>Ship</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>}
        <ul className='shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]'>
          {messageP && <p className='text-center'>{messageP}</p>}
          {saleRender && sales.map((data) => (
            <li className="px-[10px] mb-[55px]" key={data.id}>
              <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                <p>{data.formattedCreatedAt} {data.formattedCreatedTime}</p>
              </div>
              <div className='flex flex-col lg:flex-row justify-around lg:mt-[40px]'>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[112px] mb-[10px]'>Order Details</p>
                  <p>Order No: {data.id}</p>
                  <p>Total: {data.total}</p>
                  <p>Quantity: {data.quantity}</p>
                  <p>Status: {data.status}</p>
                </div>
                <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[145px] mb-[10px]'>Customer Details</p>
                  <p>Customer: {data.customer}</p>
                  <p>Address: {data.address}</p>
                  <p>City: {data.city}</p>
                  <p>State: {data.state}</p>
                  <p>Postcode: {data.postcode}</p>
                  <p>Country: {data.country}</p>
                </div>
                <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px] lg:border-l-black lg:border-l-[0.1px]'></div>
                <div>
                  <p className=' rounded-[15px] pl-[10px] text-white bg-[#886262] text-[15px] w-[130px] mb-[10px]'>Contact Details</p>
                  <p>Email: {data.email}</p>
                  <p>Phone: {data.phone}</p>
                  <div className='flex justify-center'>
                    <button onClick={() => updateStatus(data.id)} className='lg:mt-[50px] mt-[20px] text-[15px] px-[30px] py-[5px] text-white bg-[#886262] rounded-[20px] cursor-pointer'>Ship</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
      <Footer/>
    </>
  )
}

export default index