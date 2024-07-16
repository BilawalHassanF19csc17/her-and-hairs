import connectToDatabase from "../../../../lib/mongodb";
import Sales from "../../../../models/sales";
import fetchOrder from "../../../../lib/woo";

export default async function handler(req, res){
     await connectToDatabase();

     if(req.method === 'GET'){
        const Orders = await fetchOrder();
        console.log(Orders);

        for (let i = 0; i < Orders.length; i++) {
            let order = Orders[i];
            await Sales.findOneAndUpdate({id: order.number},{
                id: order.number,
                date: new Date(order.date_created),
                total: order.total,
                customer: `${order.billing.first_name} ${order.billing.last_name}`,
                address: `${order.billing.address_1} ${order.billing.address_2}`,
                city: order.billing.city, 
                state: order.billing.state,
                postcode: order.billing.postcode,
                country: order.billing.country,
                email: order.billing.email,
                phone: order.billing.phone,
                quantity: order.line_items[0].quantity
            },{
                upsert: true
            });
        }
        res.status(200).json({message: 'Record Added Successfully'})
     }
}