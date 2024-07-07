import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String},
    email:{type: String, required: true, unique: true },
    password:{type: String, required: true, unique: true },
    role:{type: String, enum:['admin', 'employee'], default: 'employee'}
},{ timestamps: true});

UserSchema.pre('save', function (next) {
    // Convert fields to lowercase before saving
    if (this.username) {
        this.username = this.username.toLowerCase();
    }
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    // Do not convert password to lowercase, as it should be stored as is
    next();
});

export default mongoose.models.User || mongoose.model('User',UserSchema);