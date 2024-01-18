import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    birthday:{
        type: Date
    },
    role:{
        type: String,
        default: "user"
    },
},{timestamps: true})

export default mongoose.model("User", UserSchema)