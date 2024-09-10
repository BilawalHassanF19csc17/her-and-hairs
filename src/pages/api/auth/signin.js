import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export default async function handler(req,res){
    await connectToDatabase();

    if(req.method === 'POST'){
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(user){
            const isValidPass = await bcrypt.compare(password,user.password);

            if(isValidPass){
                const userID = user._id;
                const userRole = user.role;
                const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{
                    expiresIn: '1h'
                });
                
                return res.status(200).json({token, userRole, userID});
            } else {
                return res.status(400).end();
            }
        } else {
            return res.status(400).json({message: 'User not exist'});
        }

    } else {
        return res.status(500).end();
    }
}