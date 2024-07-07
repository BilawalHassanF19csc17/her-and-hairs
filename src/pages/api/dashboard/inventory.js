import connectToDatabase from "../../../../lib/mongodb";
import Inventory from "../../../../models/Inventory";


export default async function handler(req,res) {
    await connectToDatabase();

    if(req.method === 'POST'){
        const {inventory} = req.body;
        
        const inventoryAdd = new Inventory({
            bottle: inventory,
        });

        await inventoryAdd.save();
        return res.status(200).json({message: "Inventory Added Successfully"});
    } else if (req.method ===  'GET') {
        const inventoryGet = await Inventory.find();
        if(inventoryGet.length === 0){
            return res.status(400).end();
        }
        return res.status(200).json(inventoryGet);
    } else{
       return res.status(500).end();
    }
}