import connectToDatabase from "../../../../lib/mongodb";
import affiliate from "../../../../models/affiliate";

export default async function handler (req, res){
    await connectToDatabase();

    if(req.method === 'POST'){
        const {email, name, countryCode, yt, ig, fb, web} = req.body;

        const existingCustomer = await affiliate.findOne({email});

        if(existingCustomer) {
            res.status(400).json({message:'Affiliate already exist'});
        }

        const Affiliate = new affiliate({
            name,
            email,
            country: countryCode,
            youtube: yt,
            facebook: fb,
            instagram: ig,
            website: web
        });

        await Affiliate.save();
        res.status(200).json({message: "Record Added"});
    } else if(req.method === 'GET'){
        const affiliates = await affiliate.find();
        if(affiliates.length === 0){
            res.status(400).end();
        }
        res.status(200).json(affiliates);
    }
      else {
        res.status(500).end();
    }
}