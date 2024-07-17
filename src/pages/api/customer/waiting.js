import connectToDatabase from "../../../../lib/mongodb";
import Customer from "../../../../models/Customer";

export default async function handler(req, res){
    await connectToDatabase();

    if(req.method === 'POST'){
        const {email, phone, countryCode, name} = req.body;

        const existingCustomer = await Customer.findOne({email});

        if(existingCustomer){
            res.status(400).json({message: "Already Exist"});
        }

        const customer = new Customer({
            name,
            email,
            phone,
            countrycode: countryCode
        })

        await customer.save();
        res.status(200).json({message: "Record Added"});
    } else {
        res.status(500).end();
    }
}