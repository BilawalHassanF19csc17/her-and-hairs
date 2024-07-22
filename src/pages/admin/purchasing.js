import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const Purchasing = () => {
    const [purchasedDetials, setPurchasedDetails] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedSales, setSelectedSales] = useState([])
    const [selectedDate, setSelectedDate] = useState('');
    const [saleRender, setSaleRender] = useState(false)
    const router = useRouter();

    async function getPurchased() {

        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole === 'employee') {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            router.push('/');
        } else {
            const response = await fetch('/api/dashboard/purchasing');
            if (response.status === 400) {
                return setMessage('No record found');
            }
            const data = await response.json();

            const formattedData = data.map(item => ({
                ...item,
                formattedCreatedAt: new Date(item.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
                total: item.oilprice + item.labelsprice + item.packagingprice, 
            }));

            formattedData.reverse();
            setPurchasedDetails(formattedData);

        }


    }
    useEffect(() => {
        getPurchased();
    }, [])

    const selectDate = (event) => {
        const date = event.target.value;
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        setSelectedDate(formattedDate);

        const salesDate = purchasedDetials.filter((item) => item.formattedCreatedAt === formattedDate);
        if (salesDate.length > 0) {
            setSelectedSales(salesDate);
            setSaleRender(true);
        }else{
            alert('No record Found');
        }
    }

    return (
        <>
            <Navbar />
            <div>
                <div className="flex justify-center">
                    {message && <p className="text-black rounded-[20px] w-[300px] bg-red-500 text-[28px] text-center mt-[40px] ">{message}</p>}
                </div>
                <div>
                    <div className='flex justify-center items-center mt-[30px]'>
                        <input className='border-[1px] border-black rounded-[20px] p-[3px]' type='date' value={selectedDate} onChange={selectDate} />
                        <button className='border-[1px] border-black rounded-[15px] ml-[5px] px-[3px] text-black bg-[#e4e4e4] text-[15px] w-[70px] ' onClick={() => setSaleRender(false)}>Cancel</button>
                    </div>
                </div>
                {saleRender && <ul className="shadow-2xl backdrop-blur-[10px] bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]">
                <p className="border-[1px] border-black my-[10px] text-center bg-[#f8f3eb] rounded-[15px] text-black w-[105px] mx-auto">{selectedDate}</p>
                    {selectedSales.map((data) => (
                        <li key={data._id} className="px-[10px]">
                            <div className="border-[1px] border-black my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[400px]">
                                <p>{data.formattedCreatedAt}</p>
                            </div>
                            <div className=" flex mb-[10px] justify-around ">
                                <div className=' mx-[2px]'>
                                    <div className="border-[1px] border-black my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[200px]">
                                        <p>Purchasings</p>
                                    </div>
                                    <p>Oil quanity: {data.oil}Ltr</p>
                                    <p>cost: {data.oilprice}Rs</p>
                                    <p className='mt-[15px]'>Labels quanity: {data.labels}Pcs</p>
                                    <p >cost: {data.labelsprice}Rs</p>
                                    <p className='mt-[15px]'>Packaging quanity: {data.packaging}Pcs</p>
                                    <p > cost: {data.packagingprice}Rs</p>
                                </div>
                                <div className=' mx-[2px]'>
                                    <div className="border-[1px] border-black my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[200px]">
                                        <p>Total Spending</p>
                                    </div>
                                    <p>Total Amount: {data.total}Rs</p>
                                </div>
                            </div>
                            <hr className="border-t-[0.1px] border-black mb-[5px]" />
                        </li>
                    ))}
                </ul>}
                {!saleRender && <ul className="shadow-2xl backdrop-blur-[10px] bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]">
                    {purchasedDetials.map((data) => (
                        <li key={data._id} className="px-[10px]">
                            <div className="border-[1px] border-black my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[400px]">
                                <p>{data.formattedCreatedAt}</p>
                            </div>
                            <div className=" flex mb-[10px] justify-around ">
                                <div className=' mx-[2px]'>
                                    <div className="border-[1px] border-black my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[200px]">
                                        <p>Purchasings</p>
                                    </div>
                                    <p>Oil quanity: {data.oil}Ltr</p>
                                    <p>cost: {data.oilprice}Rs</p>
                                    <p className='mt-[15px]'>Labels quanity: {data.labels}Pcs</p>
                                    <p >cost: {data.labelsprice}Rs</p>
                                    <p className='mt-[15px]'>Packaging quanity: {data.packaging}Pcs</p>
                                    <p > cost: {data.packagingprice}Rs</p>
                                </div>
                                <div className=' mx-[2px]'>
                                    <div className=" border-[1px] border-black my-[20px] text-center bg-[#f8f3eb] rounded-[15px] text-black lg:w-[200px]">
                                        <p>Total Spending</p>
                                    </div>
                                    <p>Total Amount: {data.total}Rs</p>
                                </div>
                            </div>
                            <hr className="border-t-[0.1px] border-black mb-[5px]" />
                        </li>
                    ))}
                </ul>}
            </div>
            <Footer/>
        </>
    )
}

export default Purchasing