import express from "express"
import { deleteDoctor, getDoctor, getDoctors, updateDoctor } from "../controller/doctor.controller.js"
import { doctorRegister, doctorLogin } from "../controller/auth.controller.js"

const router = express.Router()

// CREATE
router.post("/doctorregister",  doctorRegister)
// LOGIN 
router.post("/doctorlogin", doctorLogin)
// UPDATE
router.put("/:id",  updateDoctor)
// DELETE 
router.delete("/:id", deleteDoctor)
// GET 
router.get("/:id", getDoctor)
// GET ALL
router.get("/", getDoctors)

export default router