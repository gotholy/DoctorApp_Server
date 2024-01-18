import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    salt:{
        type: String,
        required: true
    },
    fachgebiet:{
        type: String,
        required: true,
        unique: false
    },
    Erfahrung:{
        type: Number,
        unique: false
    }, 
    role:{
        type: String,
        default: "doctor",
        unique: false
    },
},{timestamps: true})

export default mongoose.model("Doctor", DoctorSchema)