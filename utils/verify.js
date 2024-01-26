import jwt from "jsonwebtoken";
import { createHmac, randomBytes } from "node:crypto";
import { createError } from "./error.js";


export function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15min' })
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
    const token = req.cookies.doctorappauth;
    if (!token) {
        return next(createError(403, "You are not authenticated verify token."));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(createError(403, "Token is not valid."));
        }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (user.exp < currentTimestamp) {
        return next(createError(403, "Token has expired."));
    }

    req.user = {...user, role: user.role};
    console.log(req.user);
    next();
    });
}

export function verifyUser(req, res,next) {
    if(req.user.role === 'user'){
        next()
    }else{
        return next(createError(403, "You are not Authenticated verify User!"))
    }
    
}
export function verifyDoctor(req, res, next) {
    if(req.user.role === 'doctor'){
        next()
    }else{
        return next(createError(403, "You are not Authenticated verify Doctor!")).end()
    }
    
}

