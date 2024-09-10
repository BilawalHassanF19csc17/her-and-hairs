import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    userID: {required: true, type: String},
    task: { required: true, type: String },
    status: {type: String, enum: ['pending', 'completed'], default: 'pending' },
    priority: {required: true, type: String},
    deadline: { required: true, type: String },
}, { timestamps: true })

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);