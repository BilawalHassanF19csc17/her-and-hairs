 import mongoose from "mongoose";

 const AffiliateSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    country: {type: String, required: true },
    youtube: {type: String, default: 'none'},
    facebook: {type: String, default: 'none'},
    instagram: {type: String, default: 'none'},
    website: {type: String, default: 'none'}, 
 },{
    timestamps: true
 });

 export default mongoose.models.Affiliate || mongoose.model('Affiliate', AffiliateSchema)