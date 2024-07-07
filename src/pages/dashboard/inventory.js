import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import NavbarEmp from '@/components/navbarEmp';
import Footer from '@/components/footer';

const Inventory = () => {
    const [inventory, setInventory] = useState('');
    const [inventorydata, setInventorydata] = useState([]);
    const [shippedSales, setShippedSales] = useState([]);
    const [message, setMessage] = useState('');
    const [inventoryCount, setInventoryCount] = useState();
    const [shippedCount, setShippedCount] = useState();
    const router = useRouter();

    const fetchInventory = async () => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole === 'admin') {
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
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                })
            }));
            formattedData.reverse();
            setInventorydata(formattedData);
            setShippedSales(dataShippedSales);
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

    const addInventory = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/dashboard/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inventory })
        });
        if (response.status === 200) {
            alert('Inventory successfully added');
            setInventory('');
        }
        setMessage('');
        await fetchInventory();
    }

    useEffect(() => {
        if (inventorydata.length > 0) {
            countInventory();
            countShipped();
        }
    }, [])

    useEffect(() => {
        fetchInventory();

    }, [router]);

    return (
        <>
            <NavbarEmp />
            <div className="main flex justify-center mt-[40px]">
                <form onSubmit={addInventory}>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" placeholder='Enter number of bottles ready' required value={inventory} onChange={(e) => setInventory(e.target.value)} />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-[#886262] w-[100px]
          h-[30px] my-5 text-white rounded-[15px]" type="submit">Add</button>
                    </div>
                </form>
            </div>
            <div>
                <div>
                    <div className="flex justify-center">
                        {message && <p className="text-white rounded-[20px] w-[300px] bg-red-500 text-[28px] text-center mt-[40px] ">{message}</p>}
                    </div>
                    <ul className="shadow-2xl backdrop-blur-[10px] bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]">
                        <div className='flex justify-end'>
                            <div className='text-white bg-[#886262] rounded-[15px] m-[20px] px-[10px] text-[20px]'>
                            <p>Inventory left: {InventoryLeft}</p>
                            </div>
                        </div>
                        {inventorydata.map((data) => (
                            <li key={data._id} className="px-[10px]">
                                <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                                    <p>{data.formattedCreatedAt}</p>
                                </div>
                                <p className='text-center'>Number of bottles added {data.bottle}</p>
                                <hr className="border-t-[0.1px] border-black mb-[5px] mt-[15px] " />
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Inventory