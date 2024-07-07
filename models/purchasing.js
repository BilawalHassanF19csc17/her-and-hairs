import mongoose from "mongoose";

const PurchasingSchema = new mongoose.Schema({
    oil:{type: Number, default: 0},
    oilprice:{type: Number, default: 0},
    labels:{type: Number,default: 0 },
    labelsprice:{type: Number,default: 0 },
    packaging:{type: Number, default: 0},
    packagingprice:{type: Number, default: 0},
},{ timestamps: true });

export default mongoose.models.Purchasing || mongoose.model('Purchasing', PurchasingSchema);