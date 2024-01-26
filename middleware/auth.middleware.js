// import { createError } from "../utils/error"
// import { verifyToken } from "../utils/verify"


// export function checkToken(req, res, next) {
//     const token = req.cookies.doctorappauth;
//     try {
//         req.payload = verifyToken(token)
//         next()
//     } catch (err) {
//         console.log(err)
//         res.status(401).end()
//     }
// }