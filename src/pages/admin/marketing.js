import React, { useEffect } from 'react'
import Navbar from '@/components/navbar'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '@/components/footer';

const Marketing = () => {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [subscribers, setSubscribers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [audience, setAudience] = useState('');
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
            const responseSub = await fetch('/api/customer/subscribe');
            const response = await fetch('/api/customer/waiting');
            const data = await response.json();
            const dataSub = await responseSub.json();
            if (response.ok) {
                setCustomers(data);
            }
            if (responseSub.ok) {
                setSubscribers(dataSub);
            }
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const createClusters = (customersArray, maxPerCluster = 300) => {
        const clusters = [];
        for (let i = 0; i < customersArray.length; i += maxPerCluster) {
            clusters.push({
                name: `Cluster ${Math.floor(i / maxPerCluster) + 1}`,
                customers: customersArray.slice(i, i + maxPerCluster),
            });
        }
        return clusters;
    };

    const handleClusterSelect = (e) => {
        const selectedIndex = e.target.value;
        setSelectedCluster(selectedIndex);  // Set the index of the selected cluster
    };

    const handleClusterChange = (e) => {
        const selectedIndex = e.target.value;
        setSelectedCluster(clusters[selectedIndex].customers);  // Select the customers from that cluster
    };


    // Populate clusters when customers array changes
    useEffect(() => {
        if (subscribers.length > 0) {
            const generatedClusters = createClusters(subscribers);
            setClusters(generatedClusters);
        }
    }, [subscribers]);


    const showCustomers = () => {
        setTabs('customers');
    }

    const showEmail = () => {
        setTabs('emails');
    }

    const showSubscribers = () => {
        setTabs('subscribers');
    }

    const selectedCustomersMail = async (customer, isChecked) => {
        if (isChecked) {
            setSelectedCustomers(prev => [...prev, customer]);
        } else {
            setSelectedCustomers(prev => prev.filter(c => c.email !== customer.email));
        }
    }

    const convertToHtmlString = (text) => {
        return text.split('\n').map(line => `<p>${line}</p>`).join('');
    };

    const sendMail = async (e) => {
        setMessage('Sending Emails Please Wait Honey♥️...')
        e.preventDefault();
        const alignedText = await convertToHtmlString(text);
        // console.log(alignedText);
        const response = await fetch('/api/customer/sendmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedCluster, selectedCustomers, audience, subject, alignedText })
        })
        if (response.status === 200) {
            const data = await response.json();
            setMessage(`${data.counter} Email(s) are sent Successfully♥️`)
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
                <div className='shadow-2xl m-4 bg-white mt-[15px] rounded-[30px] w-[320px] flex p-[3px]'>
                    <button onClick={showCustomers} className={`${tabs === 'customers' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Customers</button>
                    <button onClick={showEmail} className={`${tabs === 'emails' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Email</button>
                    <button onClick={showSubscribers} className={`${tabs === 'subscribers' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Subscribers</button>
                </div>
            </div>
            {tabs === 'customers' && <div className='flex justify-center items-center   w-[100%]'>
                <ul className='w-[400px] lg:w-[900px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className='border-[1px] border-black rounded-[15px] pl-[10px] text-black bg-[#f8f3eb] text-
                    [15px] w-[140px] mb-[30px]'>Customer Details</p>
                    <p className='border-[1px] border-black rounded-[15px] pl-[10px] text-black bg-[#f8f3eb] text-
                    [15px] w-[250px] mb-[30px]'>Total number of Customers {customers.length}</p>
                    {customers.map((customer) => (
                        <li className='w-[100%]' key={customer.email}>
                            <div className='flex justify-center w-[100%]'>
                                <div className='w-[10%] flex justify-start items-center lg:w-[5%]'>
                                    <input
                                        type='checkbox'
                                        onChange={(e) =>
                                            selectedCustomersMail(
                                                { email: customer.email },
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                                <div className='w-[90%] flex-wrap lg: flex lg: justify-between '>
                                    <p>Name: {customer.name}</p>
                                    <p>Email: {customer.email}</p>
                                    <p>Phone: {customer.countrycode} {customer.phone}</p>
                                </div>
                            </div>
                            <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px]'></div>
                        </li>
                    ))}
                </ul>
            </div>}
            {tabs === 'emails' && <div className='flex justify-center items-center lg:h-[600px] h-[600px] w-[100%]'>
                <form onSubmit={sendMail} className='w-[400px] lg:w-[600px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className='border-[1px] border-black rounded-[15px] pl-[0px] text-black bg-[#f8f3eb] text-[15px] w-[140px] mb-[30px] text-center'>Write your Email</p>
                    <div>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[370px] lg:w-[515px] h-[40px] px-[15px]' type='text' placeholder='Enter Subject' value={subject} onChange={(e) => setSubject(e.target.value)} required />
                    </div>
                    <div>
                        <textarea
                            className='border-2 border-grey rounded-[5px] my-2 w-full pl-[15px] pr-[15px] pt-[15px]'
                            cols={57}
                            rows={10}
                            placeholder='Type your magical mail'
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div>
                        <select value={audience} onChange={(e) => setAudience(e.target.value)} className='h-[39px] bg-white rounded-[5px] border-[2px] border-gray-200' >
                            <option disabled value={''}>
                                Select audience
                            </option>
                            <option value={'Selected Audience'}>
                                Selected Audience
                            </option>
                            <option value={'subscribers'}>
                                Subscribers
                            </option>
                            <option value={'customers'}>
                                Customers
                            </option>
                        </select>
                    </div>
                    <div>
                        <select value={selectedCluster !== null ? selectedCluster : ''} onChange={handleClusterSelect} className="h-[39px] bg-white rounded-[5px] border-[2px] border-gray-200 w-[160px] mt-[10px]" >
                            <option disabled value={''}>
                                Select Cluster
                            </option>
                            {clusters.map((cluster, index) => (
                                <option key={index} value={index}>
                                    {cluster.name} ({cluster.customers.length} customers)
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mt-[10px]'>
                        <button className='border-[1px] border-black bg-[#f8f3eb] w-[100px]
          h-[30px] my-5 text-black rounded-[15px]'  type='submit' >Submit</button>
                    </div>
                    <div>
                        {message && <p className="text-black italic text-center text-[12px]">{message}</p>}
                    </div>
                </form>
            </div>}
            {tabs === 'subscribers' && <div className='flex justify-center items-center   w-[100%]'>
                <ul className='w-[400px] lg:w-[900px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className='border-[1px] border-black rounded-[15px]  text-black bg-[#f8f3eb] text-[15px] w-[160px] text-center mb-[30px]'>Subscribers Details</p>
                    <p className='border-[1px] border-black rounded-[15px] pl-[10px] text-black bg-[#f8f3eb] text-
                    [15px] w-[180px] mb-[30px]'>Total Subscribers {subscribers.length}</p>
                    {subscribers.map((customer) => (
                        <li className='w-[100%]' key={customer.email}>
                            <div className=' flex justify-start flex-wrap lg:justify-around'>
                                <p>Name: {customer.name}</p>
                                <p>Email: {customer.email}</p>
                            </div>
                            <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px]'></div>
                        </li>
                    ))}
                </ul>
            </div>}
            <Footer />
        </>
    )
}

export default Marketing