import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    fachgebiet:{
        type: String,
        required: true,
        unique:true
    },
    Erfahrung:{
        type: Number,
        required: true
    },
},{timestamps: true})

export default mongoose.model("Doctor", DoctorSchema)