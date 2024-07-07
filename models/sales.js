import mongoose from "mongoose";

const SalesSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    status: { type: String, enum: ['shipped', 'pending'], default: 'pending' },
    date: { type: String, required: true },
    total: { type: String, required: true },
    customer: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    quantity: { type: Number, required: true }
},{
    timestamps: true
});

export default mongoose.models.Sales || mongoose.model('Sales', SalesSchema);