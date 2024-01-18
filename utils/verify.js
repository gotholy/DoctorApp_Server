import jwt from "jsonwebtoken";
import { createHmac, randomBytes } from "node:crypto";
import { createError } from "./error.js";

export function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2min' })
}

export function createHash(password, salt) {
    const hmac = createHmac('sha256', salt)
    hmac.update(password)
    return hmac.digest('hex')
}

export function createSalt() {
    return randomBytes(12).toString('hex')
}

export function verifyToken(req, res, next) {
    const token = req.cookies.doctorappauth
    if(!token){
        return next(createError(403, "Yau are not Authenticated"))
    }
    jwt.verify(token, process.env.JWT_SECRET,(err, user)=> {
        if(err) return next(createError(403, "Token is not Valid!"))
    })
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req,res,next, ()=> {
        if(req.user.id === req.params.id){
            next()
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}
