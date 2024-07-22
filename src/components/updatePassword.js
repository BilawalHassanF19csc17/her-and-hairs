import React from 'react'
import { useState } from 'react'

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [newpassword, setnewPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [message, setMessage] = useState('');

    const updateNewPassword = async (e) => {
        e.preventDefault();
        if (newpassword === repassword) {
            const response = await fetch('/api/auth/updatepassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password, newpassword })
            })
            if (response.status === 200) {
                setPassword('');
                setnewPassword('');
                setRepassword('');
                return setMessage('Password updated successfully!')
            } else {
                setPassword('');
                setnewPassword('');
                setRepassword('');
                return setMessage('Incorrect password. Try again')
            }
        } else {
            setPassword('');
                setnewPassword('');
                setRepassword('');
            setMessage('Password does not match')
        }
    }
    return (
        <>
            <p className="text-center mt-[50px]">Update your password</p>
            <div className="form flex justify-center mt-[10px]">
                <form onSubmit={updateNewPassword}>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type='password' placeholder='Confirm Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type='password' placeholder='New Password' value={newpassword} onChange={(e) => setnewPassword(e.target.value)} />
                    </div>
                    <div>
                        <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type='password' placeholder='Re-Enter Password' value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                    </div>
                    <div className=" flex justify-center"><button className="border-[1px] border-black bg-[#e4e4e4] w-[100px]
          h-[30px] my-5 text-black rounded-[15px]" type='submit'>Update</button></div>
                </form>
            </div>
            <div className="mx-[30px]">{message && <p className="text-slate-600 text-center text-[12px] mb-[20px]">{message}</p>}</div>
            <hr className="border-t-[0.1px] border-black" />
        </>
    )
}

export default UpdatePassword