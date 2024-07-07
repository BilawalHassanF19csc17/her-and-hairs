import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import NavbarEmp from "@/components/navbarEmp";
import Footer from "@/components/footer";

export default function Purchasing() {
    const [oil, setOil] = useState('');
    const [labels, setLabels] = useState('');
    const [packaging, setPackaging] = useState('');
    const [purchasedDetials, setPurchasedDetails] = useState([]);
    const [message, setMessage] = useState('');
    const router = useRouter();

    async function getPurchased() {

        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole === 'admin') {
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
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                })
            }));

            formattedData.reverse();
            setPurchasedDetails(formattedData);

        }


    }


    async function purchased(e) {
        e.preventDefault();
        const response = fetch('/api/dashboard/purchasing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oil, labels, packaging })
        });
        if ((await response).status === 200) {
            setLabels('');
            setOil('');
            setPackaging('');
            setMessage('');
            alert('Purchasing added successfully');
        }

        await getPurchased();
    }

    useEffect(() => {
        getPurchased();
    }, [])

    return (
        <>
            <NavbarEmp />
            <div className="main flex justify-center mt-[40px]">
                <form onSubmit={purchased}>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" value={oil} placeholder="Enter Oil quantity(in liters)" onChange={(e) => setOil(e.target.value)} />
                    </div>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" value={labels} placeholder="Enter labels quantity" onChange={(e) => setLabels(e.target.value)} />
                    </div>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" value={packaging} placeholder="Enter packaging quantity" onChange={(e) => setPackaging(e.target.value)} />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-[#886262] w-[100px]
          h-[30px] my-5 text-white rounded-[15px]" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <div className="flex justify-center">
                    {message && <p className="text-white rounded-[20px] w-[300px] bg-red-500 text-[28px] text-center mt-[40px] ">{message}</p>}
                </div>
                <ul className="shadow-2xl backdrop-blur-[10px] bg-opacity-20 m-4 py-4 mb-4 rounded-[10px]">
                    {purchasedDetials.map((data) => (
                        <li key={data._id} className="px-[10px]">
                            <div className="my-[20px] text-center bg-[#886262] rounded-[15px] text-white lg:w-[400px]">
                                <p>{data.formattedCreatedAt}</p>
                            </div>
                            <div className=" flex justify-between mb-[10px]">
                                <div className="text-center">
                                    <p>Oil quanity: {data.oil}Ltr</p>
                                    <p className="mt-[15px]">cost: {data.oilprice}Rs</p>
                                </div>
                                <div className="text-center">
                                    <p>Labels quanity: {data.labels}Pcs</p>
                                    <p className="mt-[15px]">cost: {data.labelsprice}Rs</p>
                                </div>
                                <div className="text-center">
                                    <p>Packaging quanity: {data.packaging}Pcs</p>
                                    <p className="mt-[15px]"> cost: {data.packagingprice}Rs</p>
                                </div>
                            </div>
                            <hr className="border-t-[0.1px] border-black mb-[5px]"/>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </>
    );
}