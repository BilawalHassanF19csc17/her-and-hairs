import { useState } from "react";
import React from 'react'

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const addUserData = async (e) => {
        e.preventDefault();
        const lowercasedUsername = username.toLowerCase();
        const lowercasedEmail = email.toLowerCase();
        const response = fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: lowercasedUsername, email: lowercasedEmail, password })
        })
        if ((await response).status === 200) {
            setEmail('');
            setUsername('');
            setPassword('');
            setMessage('User created Successfully!');
        } else if ((await response).status === 400) {
            setEmail('');
            setUsername('');
            setPassword('');
            setMessage('User already exist!')
        } else {
            setEmail('');
            setUsername('');
            setPassword('');
            setMessage('User failed to create')
        }
    }

    return (
        <>
            <p className="text-center mt-[50px]">Add new user to Employee Role</p>
            <div className="form flex justify-center mt-[10px]">
                <form onSubmit={addUserData}>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
                    </div>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="emai" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                    </div>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-[#e4e4e4] w-[100px]
          h-[30px] my-5 text-black rounded-[15px]" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className="mx-[30px]">
                {message && <p className="text-green-600 text-center text-[12px] mb-[20px]">{message}</p>}
                <hr className="border-t-[0.1px] border-black" />
            </div>
        </>
    )
}

export default AddUser