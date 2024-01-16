import Doctor from "../models/doctor.model.js"

export const createDoctor = async (req, res, next) =>{
    const newDoctor = new Doctor(req.body)

    try {
        const savedDoctor = await newDoctor.save()
        res.status(200).json(savedDoctor)
    } catch (error) {
        next(err)
    }
}

export const updateDoctor = async (req,res,next)=> {
    try {
        const updateDoctor = await Doctor.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true})
        res.status(200).json(updateDoctor)
    } catch (error) {
        next(err)
    }
}

export const deleteDoctor = async (req,res,next) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id)
        res.status(200).json("Doctor has been deleted!")
    } catch (error) {
        next(err)
    }
}

export const getDoctor = async (req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        res.status(200).json(doctor)
    } catch (error) {
        next(err)
    }
}
export const getDoctors = async (req,res,next) => {
    try {
        const doctors = await Doctor.find()
        res.status(200).json(doctors)
    } catch (error) {
        next(err)
    }
}