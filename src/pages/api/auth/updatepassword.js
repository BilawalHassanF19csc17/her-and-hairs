import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res){
    await connectToDatabase();

    if(req.method === 'PUT'){
        const user = await User.findOne({role: 'admin'});
        if(user){
            const {password, newpassword} = req.body;
            const validPassword = await bcrypt.compare(password,user.password);

            if(validPassword) {
                const updatedPassword = await bcrypt.hash(newpassword,10);
                const userUpdate = await User.findOneAndUpdate({_id: user.id},{
                    password: updatedPassword
                },{new: true})

                if(userUpdate){
                    res.status(200).json({message: 'Password updated successfully'});
                } 
            } else {
                res.status(400).json({message: 'Incorrect Password.'})
            }
        }
    } else {
        res.status(500).json({message: 'Method not allowed'})
    }
}