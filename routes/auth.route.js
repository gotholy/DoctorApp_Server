import express from "express"
import { verifyDoctor, verifyToken, verifyUser } from "../utils/verify.js"

const router = express.Router()

router.get("/verifyuser", verifyToken,verifyUser, (req, res) => {
    // If the middleware successfully verifies the token, you can send a success response.
    res.json({ success: true, message: 'User is verified' });
  })
router.get("/verifydoctor", verifyToken,verifyDoctor, (req, res) => {
    // If the middleware successfully verifies the token, you can send a success response.
    res.json({ success: true, message: 'Doctor is verified' });
  })

export default router 