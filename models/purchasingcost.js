import mongoose from "mongoose";

const PurchasingCostSchema = new mongoose.Schema({
    oilcost:{type: Number, required: true, default: 10},
    labelcost:{type: Number, required: true, default: 10},
    packagingcost:{type: Number, required: true, default: 10},
});

export default mongoose.models.Purchasingcost || mongoose.model('Purchasingcost', PurchasingCostSchema);