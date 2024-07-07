import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'


const Inventory = () => {
    const [inventorydata, setInventorydata] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedSales, setSelectedSales] = useState([])
    const [shippedSales, setShippedSales] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [saleRender, setSaleRender] = useState(false)
    const [inventoryCount, setInventoryCount] = useState();
    const [shippedCount, setShippedCount] = useState();
    const router = useRouter();

    const fetchInventory = async () => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole === 'employee') {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            router.push('/');
        } else {
            const response = await fetch('/api/dashboard/inventory');
            const responseShippedSales = await fetch('/api/dashboard/salesS'); 
            if (response.status === 400) {
                return setMessage('No Record found');
            }
            const dataShippedSales = await responseShippedSales.json();
            const data = await response.json();

            const formattedData = data.map(item => ({
                ...item,
                formattedCreatedAt: new Date(item.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
                formattedCreatedTime: new Date(item.createdAt).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                }),
            }));
            formattedData.reverse();
            setInventorydata(formattedData);
            setShippedSales(dataShippedSales);
        }
    }

    useEffect(() => {
        if (inventorydata.length > 0) {
            countInventory();
            countShipped();
        }
    }, [inventorydata])

    useEffect(() => {
        fetchInventory();
    }, [router]);

    const selectDate = (event) => {
        const date = event.target.value;
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        setSelectedDate(formattedDate);

        const salesDate = inventorydata.filter((item) => item.formattedCreatedAt === formattedDate);
        if (salesDate.length > 0) {
            setSelectedSales(salesDate);
            setSaleRender(true);
        } else {
            alert('No record Found');
        }
    }

    const countInventory = () => {
        let count = 0;
        for (let i = 0; i < inventorydata.length; i++) {
            count = count + inventorydata[i].bottle;
        }
        setInventoryCount(count)
    }

    const countShipped = () =>{
        let count = 0;
        for (let i = 0; i < shippedSales.length; i++) {
            count = count + shippedSales[i].quantity;     
        }
        setShippedCount(count);
    }

    const InventoryLeft = inventoryCount-shippedCount;
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
                <div>
                    <div>
                        <div className='flex justify-center items-center mt-[30px]'>
                            <input className='rounded-[20px] p-[3px]' type='date' value={selectedDate} onChange={selectDate} />
                            <button className='rounded-[15px] ml-[5px] px-[3px] text-white bg-[#886262] text-[15px] w-[70px] ' onClick={() => setSaleRender(false)}>Cancel</button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {message && <p className="text-white rounded-[20px] w-[300px] bg-red-500 text-[28px] text-center mt-[40px] ">{message}</p>}
                    </div>
                    {saleRender && <ul className="shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]">
                        <p className="my-[10px] text-center bg-[#886262] rounded-[15px] text-white w-[105px] mx-auto">{selectedDate}</p>
                        {selectedSales.map((data) => (
                            <li key={data._id} className="px-[10px]">
                                <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                                    <p>{data.formattedCreatedAt} {data.formattedCreatedTime}</p>
                                </div>
                                <p className='text-center'>Number of bottles added {data.bottle}</p>
                                <hr className="border-t-[0.1px] border-black mb-[5px] mt-[15px] " />
                            </li>
                        ))
                        }
                    </ul>}
                    {!saleRender && <ul className="shadow-2xl blurred-background bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]">
                        <div className='flex justify-end'>
                            <div className='text-white bg-[#886262] rounded-[15px] m-[20px] px-[10px] text-[20px]'>
                                <p>Inventory left:{InventoryLeft} </p> 
                            </div>
                        </div>
                        {inventorydata.map((data) => (
                            <li key={data._id} className="px-[10px]">
                                <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                                    <p>{data.formattedCreatedAt} {data.formattedCreatedTime}</p>
                                </div>
                                <p className='text-center'>Number of bottles added {data.bottle}</p>
                                <hr className="border-t-[0.1px] border-black mb-[5px] mt-[15px] " />
                            </li>
                        ))
                        }
                    </ul>}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Inventory