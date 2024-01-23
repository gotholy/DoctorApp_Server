import User from "../models/user.model.js"
import Doctor from "../models/doctor.model.js"
import {createError} from "../utils/error.js"
import {createHash, createSalt, createToken} from "../utils/verify.js"

export async function userLogin(req,res, next){
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return next(createError(404,"User not found"))
        if(user.password !== createHash(req.body.password, user.salt))
            return next(createError(400, "Wrong password or email"))

            const token = createToken({ user: user._id})

            res.cookie("doctorappauth", token, {
                httpOnly: true,
                secure: true
            }).status(200).send("Perfect User has been Logged in")
    } catch (err) {
        next(err)
    }
}

export async function userRegister(req, res, next) {

try {
    const dbUser = await User.findOne({email: req.body.email})
    if(dbUser) return next(createError(409, "Profil exists already!" ))
    const newUser = new User(req.body)
    newUser.salt=createSalt()
    newUser.password=createHash(newUser.password, newUser.salt)
    await newUser.save()
    res.status(201).json({ message: 'User has been created' })
} catch (err) {
    next(createError(500, "Failed to create user!"))
}
    
}
export async function doctorRegister(req, res, next) {

try {
    const dbDoctor = await Doctor.findOne({email: req.body.email})
    if(dbDoctor) return next(createError(409,"Profil exists already!"))
    const newDoctor = new Doctor(req.body)
    newDoctor.salt=createSalt()
    newDoctor.password=createHash(newDoctor.password, newDoctor.salt)
    await newDoctor.save()
    res.status(201).json({ message: 'Doctor has been created' })
} catch (err) {
    next(createError(500, "Failed to create Doctor!"))
}
    
}

export async function doctorLogin(req,res, next){
    try {
        const doctor = await Doctor.findOne({email: req.body.email })
        if(!doctor) return next(createError(404,"Doctor not found"))
        if(doctor.password !== createHash(req.body.password, doctor.salt))
            return next(createError(400, "Wrong password or email"))

            const token = createToken({ doctor: doctor._id})

            res.cookie("doctorappauth", token, {
                httpOnly: true,
                secure: true
            }).status(200).json({ message: "Perfect Doctor has been Logged in"})
    } catch (err) {
        console.error();
        next(err)
    }
}