const WOO_BASE_URL = process.env.WOO_BASE_URL;
const WOO_CONSUMER_KEY = process.env.WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET;

const fetchOrder = async ()=>{
    const response = await fetch(`${WOO_BASE_URL}/orders`,{
        headers:{
            Authorization: `Basic ${Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64')}`
        }
    });
    
    return response;
}

export default fetchOrder