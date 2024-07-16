const WOO_BASE_URL = process.env.WOO_BASE_URL;
const WOO_CONSUMER_KEY = process.env.WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET;

const fetchOrder = async () => {
    try {
        const response = await fetch(`${WOO_BASE_URL}/wp-json/wc/v3/orders`, {
            headers: {
                Authorization: `Basic ${Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString('base64')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch order failed:', error);
        throw error;
    }
};

export default fetchOrder;
