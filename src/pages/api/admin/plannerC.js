import connectToDatabase from "../../../../lib/mongodb";
import Tasks from "../../../../models/Tasks";

export default async function handler(req, res){
    await connectToDatabase();

    if(req.method === 'POST'){
        const {userID, task, priority, deadline} = req.body;
        
        const taskAdd = new Tasks({
            userID,
            task,
            priority,
            deadline
        });

        await taskAdd.save();
        res.status(200).json({message: "New Task added Sweetheart <3"});
    } else if(req.method === 'GET'){
        const {userID} = req.query;
        const taskGet = await Tasks.find({userID, status: 'completed'});
        console.log(taskGet);
        if(taskGet.length === 0){
            res.status(300).json({messge:"No task found"});
        }
        res.status(200).json(taskGet);
    } else {
        res.status(400).json({message:"Method not allowed"})
    }
}