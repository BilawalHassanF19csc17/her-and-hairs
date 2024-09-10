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
        const taskGet = await Tasks.find({userID, status: 'pending'});
        console.log(taskGet);
        if(taskGet.length === 0){
            res.status(300).json({messge:"No task found"});
        }
        res.status(200).json(taskGet);
    } else if(req.method === 'PUT'){
        const {id} = req.body;
        await Tasks.findOneAndUpdate({_id:id},{
            status: 'completed'
        });
        res.status(200).json({message: "Updated"})
    } else if(req.method === 'DELETE'){
        const {id} = req.body;
        await Tasks.findOneAndDelete({_id:id});
        res.status(200).json({message: "Updated"})
    } else {
        res.status(400).json({message:"Method not allowed"})
    }
}