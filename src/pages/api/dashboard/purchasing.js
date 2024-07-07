import connectToDatabase from "../../../../lib/mongodb";
import Purchasing from "../../../../models/purchasing";
import Purchasingcost from "../../../../models/purchasingcost";


export default async function handler(req, res){
    await connectToDatabase();

    
    if(req.method === 'POST'){
        const costs = await Purchasingcost.find();
        const {oil, labels, packaging} = req.body;
        const oilprice = oil*costs[0].oilcost;
        const labelsprice = labels*costs[0].labelcost; 
        const packagingprice = packaging*costs[0].packagingcost;
        const purchased = new Purchasing({
            oil,
            oilprice: oilprice,
            labels,
            labelsprice: labelsprice,
            packaging,
            packagingprice: packagingprice, 
        });
        await purchased.save();

        return res.status(200).json({message: "Record Added Successfully"})
    } else if (req.method === 'GET'){
        const purchased = await Purchasing.find();
        if(purchased.length === 0){
            return res.status(400).end();
        }
        return res.status(200).json(purchased); 
    }
}