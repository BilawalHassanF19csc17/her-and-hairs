import connectToDatabase from "../../../../lib/mongodb";
import Purchasingcost from "../../../../models/purchasingcost";


export default async function handler(req,res){
    await connectToDatabase();

    if(req.method === 'PUT'){
        const {id, oilcost, labelcost, packagingcost} = req.body;
        const purchasing = await Purchasingcost.findByIdAndUpdate({_id: id},{
            oilcost,
            labelcost,
            packagingcost,
        },{new: true});
        if(purchasing){
            return res.status(200).json({message: "Updated Successfully"});
        }
    } else if(req.method === 'GET') {
        const costs = await Purchasingcost.find();
        if(costs.length === 0){
            return res.status(400).json({message: 'No Record Found'});
        }
        return res.status(200).json(costs);
    } else {
        return res.status(500).end();
    }
}