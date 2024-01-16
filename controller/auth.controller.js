import User from "../models/user.model.js"
import {createError} from "../utils/error.js"
import {createHash, createSalt, createToken} from "../utils/verify.js"

export async function login(req,res, next){
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) return next(createError(404),"User not found")
        if(user.password !== createHash(req.body.password, user.salt))
            return next(createError(400), "Wrong password or email")

            const token = createToken({ user: user._id})

            res.cookie("doctorappauth", token, {
                httpOnly: true,
                secure: true
            }).status(200).send("Perfect User has been Logged in")
    } catch (err) {
        next(err)
    }
}

export async function register(req, res, next) {

try {
    const dbUser = await User.findOne({email: req.body.email})
    if(dbUser) return next(createError(404,"User not found!")).end()
    const newUser = new User(req.body)
    newUser.salt=createSalt()
    newUser.password=createHash(newUser.password, newUser.salt)
    await newUser.save()
    res.status(201).send("User has been created")
} catch (err) {
    next(err)
}
    
}