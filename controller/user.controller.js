import User from "../models/user.model.js"

export const updateUser = async (req,res,next)=> {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body},{new: true})
        res.status(200).json(updateUser)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted!")
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
export const getUsers = async (req,res,next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}
export async function getActualUser(req, res) {
    try {
        const user = await User.findById(req.payload.user).select({ salt: 0, password: 0 })
        console.log(user)
        res.json({ email: user.email, role: user.role })
    } catch (err) {
        console.log(err);
        res.status(500).end()
    }
}
