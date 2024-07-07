import connectToDatabase from "../../../../lib/mongodb";
import Sales from "../../../../models/sales";

export default async function handler(req,res){
    await connectToDatabase();

    if(req.method === 'GET'){
        const response = await Sales.find({status: 'pending'});
        if(response.length > 0){
            res.status(200).json(response)
        } else {
            res.status(400).json({message: 'no Record found'})
        }
    } else {
        res.status(500).end();
    }
}