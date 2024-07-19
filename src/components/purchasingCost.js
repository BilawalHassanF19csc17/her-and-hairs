import { useEffect, useState } from "react"

export default function PurchasingCost(){
    const [oilcost,setOilCost] = useState('');
    const [labelcost,setLabelCost] = useState('');
    const [packagingcost,setPackagingCost] = useState('');
    const [costs, setCost] = useState([]);
    const [id, setId] = useState('');
    const [message,setMessage] = useState('');

    const fetchPurchasingCost = async()=>{
        const response = await fetch('/api/admin/purchasingcost');
        if(response.status === 400){
            return setMessage('No record found');
        }
        const data = await response.json();
        setCost(data);
    }

    useEffect(() => {
        if (costs.length > 0) {
            setId(costs[0]._id);
        }
    }, [costs]);

    const addPurchasingCost = async(e)=>{ 
        e.preventDefault();
        const response = await fetch('/api/admin/purchasingcost',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              }, 
            body: JSON.stringify({id, oilcost,labelcost,packagingcost})  
        })
        if(response.ok){
            setLabelCost('');
            setOilCost('');
            setPackagingCost('');
            alert('Costs Updated Successfully!!')
            await fetchPurchasingCost();
        }
    }

    useEffect(()=>{
        fetchPurchasingCost();
    },[])

    return(
        <>
        <p className="text-center mt-[20px]">Add updated costs</p>
        <div className="form flex justify-center mt-[10px]">
            <form onSubmit={addPurchasingCost}>
                <div>
                    <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" placeholder="Enter Oil cost" value={oilcost} onChange={(e)=>setOilCost(e.target.value)}/>
                </div>
                <div>
                <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" placeholder="Enter label cost" value={labelcost} onChange={(e)=>setLabelCost(e.target.value)}/>               
                </div>
                <div>
                <input className="border-2 border-grey rounded-[5px] my-2 w-[245px] h-[40px] text-center" type="number" placeholder="Enter packaging cost" value={packagingcost} onChange={(e)=>setPackagingCost(e.target.value)}/>
                </div>
                <div className="flex justify-center">
                    <button className="bg-[#e4e4e4] w-[100px]
          h-[30px] my-5 text-black rounded-[15px]" type="submit">Update</button>
                </div>
            </form> 
        </div>
        <div className="mt-[10px] px-[30px]">
            <p className=" text-center">Last Updated Costs</p>
            {message && <p>{message}</p>}
            <ul className="my-[20px] flex justify-center">
                {costs.map((data)=>(
                    <li key={data._id}>
                        <p className="text-center my-[2px]">Oil Cost: {data.oilcost}Rs</p>
                        <p className="text-center my-[2px]">Label Cost: {data.labelcost}Rs</p>
                        <p className="text-center my-[2px]">Packaging Cost: {data.packagingcost}Rs</p>
                    </li>
                ))
                }
            </ul>
            <hr className="border-t-[0.1px] border-black"/>
        </div>
        </>
    )
    }