import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: {required: true, type: String},
    email: {required: true, type: String, unique: true},
    phone: {required: true, type: Number, unique: true},
    countrycode: {required: true, type: String,}
},{ timestamps: true})

export default mongoose.models.Customer || mongoose.model('Customer',CustomerSchema);