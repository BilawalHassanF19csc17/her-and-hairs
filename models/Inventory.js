import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
    bottle:{type: Number, required: true}
},{ timestamps:true });

export default mongoose.models.Inventory || mongoose.model('Inventory',InventorySchema)