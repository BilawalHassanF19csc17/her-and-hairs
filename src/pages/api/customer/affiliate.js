import connectToDatabase from "../../../../lib/mongodb";
import Affiliate from "../../../../models/Affiliate";

export default async function handler (req, res){
    await connectToDatabase();

    if(req.method === 'POST'){
        const {email, name, phone, countryCode, yt, ig, fb, web} = req.body;

        const existingCustomer = await Affiliate.findOne({email});

        if(existingCustomer) {
            res.status(400).json({message:'Affiliate already exist'});
        }

        const affiliate = new Affiliate({
            name,
            email,
            phone,
            country: countryCode,
            youtube: yt,
            facebook: fb,
            instagram: ig,
            website: web
        });

        await affiliate.save();
        res.status(200).json({message: "Record Added"});
    } else if(req.method === 'GET'){
        const affiliates = await Affiliate.find();
        if(affiliates.length === 0){
            res.status(400).end();
        }
        res.status(200).json(affiliates);
    }
      else {
        res.status(500).end();
    }
}