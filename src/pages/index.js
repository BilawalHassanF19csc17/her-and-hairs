import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/loader";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const fetchOrderWoo = async ()=>{
    const response = await fetch('api/woo/orders');
    console.log(response);
  }

  useEffect(()=>{
    fetchOrderWoo();
  },[])

  const login = async (e) => {
    e.preventDefault();
    setLoader(true);
    const lowercasedEmail = email.toLowerCase();
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: lowercasedEmail, password })
    })
    if (response.status === 200) {
      const { token, userRole, userID } = await response.json();
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userID', userID);
      if (userRole === 'employee') {
        router.push('/');
      } else {
        router.push('/admin')
      }
    } else {
      setEmail('');
      setPassword('');
      return setMessage('Invalid Password or username. Try again');
    }
  };

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
      <div className="main flex justify-evenly flex-wrap-reverse lg:mt-[50px]" >
        <div className="logo flex justify-center flex-col items-center w-[100%] lg:w-[60%]">
        <div className="mt-[70px]">
          <h1 className="text-3xl font-bold text-center text-gray-900">Her and Hair</h1>
          <p className="mt-2 text-center text-gray-600 px-[20px] text-[20px]">
            Welcome to Her and Hair Inventory Management System. Streamline your inventory, manage your finances, track orders, and boost sales effectively. Empowering you to focus on growing your brand.
          </p>
        </div>
        </div>
        <form className="lg:w-[340px] signin bg-[#f8f3eb] w-[90%] my-[100px] py-10 rounded-[10px] shadow-2xl blurred-background bg-opacity-20 p-4 mb-4" onSubmit={login}>
        {loader && <Loader/>}
          <div className="logo flex justify-center w-[100%] lg:w-[100%]">
          <Image src="/image-removebg-preview.png" width={150} height={150} alt="logo" />
        </div>
          <div className=" flex justify-center mt-[10px]">
            <input className=" border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required />
          </div>
          <div className=" flex justify-center">
            <input className=" text-center border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px]" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#e4e4e4] w-[100px]
          h-[30px] my-5 text-black rounded-[15px] border-[1px] border-black" type="submit">Login

            </button>
          </div>
          <div>{message && <p className="text-red-600 text-center text-[12px]">{message}</p>}</div>
        </form> 
      </div>
    </>
  );
}
