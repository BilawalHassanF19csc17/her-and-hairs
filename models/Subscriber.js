import mongoose from "mongoose";

const SubcriberSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true  },
    email: {type: String, unique: true, required: true  }
},{
    timestamps: true
})

export default mongoose.models.Subcriber || mongoose.model('Subcriber', SubcriberSchema);