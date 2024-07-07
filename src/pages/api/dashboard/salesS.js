import connectToDatabase from "../../../../lib/mongodb";
import Sales from "../../../../models/sales";

export default async function handler(req, res){
    await connectToDatabase();

    if(req.method === 'GET'){
        const response = await Sales.find({status: 'shipped'});
        if(response.length > 0){
            res.status(200).json(response);
        } else {
            res.status(400).json({message: 'No Shipped orders'})
        }
    } else if(req.method === 'POST'){
        const {id} = req.body;
        const response = await Sales.findOneAndUpdate({id: id},{
            status: 'shipped'
        });
        if(response){
            res.status(200).json({message: 'Order Upadted Successfully'});
        }
    } else {
        res.status(500).end();
    }
}