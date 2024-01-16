import express from "express"
import { createDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor } from "../controller/doctor.controller.js"

const router = express.Router()

// CREATE
router.post("/", createDoctor)
// UPDATE
router.put("/:id", updateDoctor)
// DELETE 
router.delete("/:id", deleteDoctor)
// GET 
router.get("/:id", getDoctor)
// GET ALL
router.get("/", getDoctors)

export default router