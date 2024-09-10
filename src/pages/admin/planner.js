import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const Planner = () => {
    const router = useRouter();
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [tabs, setTabs] = useState('addTasks');
    const [message, setMassage]= useState('');

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const userID = localStorage.getItem('userID');
        const url = `/api/admin/planner?userID=${userID}`;
        const urlSub = `/api/admin/plannerC?userID=${userID}`;
        console.log(userID);
        if (!token || userRole === 'employee') {
            localStorage.removeItem('token');
            localStorage.removeItem('userRole');
            router.push('/');
        } else {
            console.log('check')
            const response = await fetch(url);
            const responseSub = await fetch(urlSub);
            const data = await response.json();
            const dataSub = await responseSub.json();
            if (response.ok) {
                setPending(data);
            }
            if (responseSub.ok) {
                setCompleted(dataSub);
            }
        }
    }

    const addTask = async (e) => {
        const userID = localStorage.getItem('userID');
        e.preventDefault();
        const response = await fetch('/api/admin/planner', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ userID, task, deadline, priority })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setMassage(data.message);
            setDeadline('');
            setTask('');
            setPriority('');
            await fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const addTasks = () => {
        setTabs('addTasks');
    }

    const pendingTasks = () => {
        setTabs('pendingTasks');
    }

    const completedTasks = () => {
        setTabs('completedTasks');
    }

    const updateTask = async (id)=>{
        const response = await fetch('/api/admin/planner',{
            method: 'PUT',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({id})
        })
        if(response.ok){
            await fetchData();
        }
    }

    const deleteTask = async (id)=>{
        const response = await fetch('/api/admin/planner',{
            method: 'DELETE',
            headers:{
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({id})
        })
        if(response.ok){
            await fetchData();
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
            <Navbar />
            <div className='flex justify-center'>
                <div className='shadow-2xl m-4 bg-white mt-[15px] rounded-[30px] w-[320px] flex p-[3px]'>
                    <button onClick={pendingTasks} className={`${tabs === 'pendingTasks' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Pending</button>
                    <button onClick={addTasks} className={`${tabs === 'addTasks' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Add Task</button>
                    <button onClick={completedTasks} className={`${tabs === 'completedTasks' ? 'bg-[#e4e4e4] text-black border-[1px] border-black' : ''} w-[50%] p-[5px] rounded-[30px]`}>Completed</button>
                </div>
            </div>
            {tabs === 'pendingTasks' && <div className='flex justify-center items-center   w-[100%]'>
                <ul className='w-[400px] lg:w-[900px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className='border-[1px] border-black rounded-[15px] text-center text-black bg-[#f8f3eb] text-
                    [15px] w-[140px] mb-[30px]'>Pending Tasks</p>
                    {pending.map((item) => (
                        <li className='w-[100%]' key={item._id}>
                            <div className='flex justify-center w-[100%]'>
                                <div className='w-[90%] flex-col lg:flex lg:justify-between items-center lg:flex-row justify-start'>
                                    <p className='text-wrap lg:w-[30%]'>Task: {item.task}</p>
                                    <p className='lg:w-[20%]'>Priority: {item.priority}</p>
                                    <p className='lg:w-[25%]'>Deadline: {item.deadline}</p>
                                    <p className='lg:w-[20%]'>Status: {item.status}</p>
                                    <button onClick={()=>updateTask(item._id)} className='border-[1px] border-black bg-[#f8f3eb] w-[100px]
          h-[30px] my-5 lg:my-0 text-black rounded-[15px]'>Complete</button>
                                </div>
                            </div>
                            <div className='border-b-black border-b-[0.1px] pb-[10px] mb-[15px]'></div>
                        </li>
                    ))}
                </ul>
            </div>}
            {tabs === 'addTasks' && <div className='flex justify-center items-center lg:h-[600px] h-[600px] w-[100%]'>
                <form onSubmit={addTask} className='w-[400px] lg:w-[600px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className='border-[1px] border-black rounded-[15px] pl-[0px] text-black bg-[#f8f3eb] text-[15px] w-[140px] mb-[30px] text-center'>Add your Task</p>
                    <div className='flex justify-between items-center flex-col'>
                    <div>
                        <input className='border-2 border-grey rounded-[5px] my-2 w-[370px] lg:w-[370px] h-[40px] p-[5px] text-black' type='text' placeholder='Task' value={task} onChange={(e) => setTask(e.target.value)} required />
                    </div>

                    <div>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} required className='h-[39px] bg-white rounded-[5px] border-[2px] border-gray-200 w-[370px] p-[5px]' >
                            <option disabled value={''}>
                                Priority
                            </option>
                            <option value={'High'}>
                                High
                            </option>
                            <option value={'Medium'}>
                                Medium
                            </option>
                            <option value={'Low'}>
                                Low
                            </option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="date"
                            className="border-2 border-grey rounded-[5px] my-2 w-[370px] p-[5px] "
                            required
                            value={deadline}  // Change 'text' to 'deadline'
                            onChange={(e) => setDeadline(e.target.value)}  // Change 'setText' to 'setDeadline'
                        />
                    </div>
                    </div>
                    
                    <div className='mt-[10px]'>
                        <button className='border-[1px] border-black bg-[#f8f3eb] w-[100px]
          h-[30px] my-5 text-black rounded-[15px]' type='submit' >Submit</button>
                    </div>
                    <div>
                        {message && <p className="text-black italic text-center text-[12px]">{message}</p>}
                    </div>
                </form>
            </div>}
            {tabs === 'completedTasks' && <div className='flex justify-center items-center   w-[100%]'>
                <ul className='w-[400px] lg:w-[900px] 
                 rounded-[10px] flex justify-center items-center flex-col shadow-2xl blurred-background bg-opacity-20 p-4 mb-4'>
                    <p className='border-[1px] border-black rounded-[15px]  text-black bg-[#f8f3eb] text-[15px] w-[160px] text-center mb-[30px]'>Subscribers Details</p>
                    {completed.map((item) => (
                        <li className='w-[100%]' key={item._id}>
                        <div className='flex justify-center w-[100%]'>
                            <div className='w-[90%] flex-col lg:flex lg:justify-between items-center lg:flex-row justify-start'>
                                <p className='text-wrap lg:w-[30%]'>Task: {item.task}</p>
                                <p className='lg:w-[20%]'>Priority: {item.priority}</p>
                                <p className='lg:w-[25%]'>Deadline: {item.deadline}</p>
                                <p className='lg:w-[20%]'>Status: {item.status}</p>
                                <button onClick={()=>deleteTask(item._id)} className='border-[1px] border-black bg-[#f8f3eb] w-[80px]
      h-[30px] my-5 lg:my-0 text-black rounded-[15px]'>Delete</button>
                            </div>
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

export default Planner