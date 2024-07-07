import bcrypt from 'bcrypt';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';

export default async function handler(req,res){

    if(req.method == 'POST'){
        await connectToDatabase();
        const {username,email,password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message: 'User already exist'});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(200).json({message: 'User created successfully'});
    } else {
        return res.status(500).end();
    }

}