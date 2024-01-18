import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller.js"
import { userRegister, userLogin } from "../controller/auth.controller.js"

const router = express.Router()

// CREATE
router.post("/",  userRegister)
// LOGIN
router.post("/userlogin", userLogin)
// UPDATE
router.put("/:id",  updateUser)
// DELETE 
router.delete("/:id", deleteUser)
// GET 
router.get("/:id", getUser)
// GET ALL
router.get("/", getUsers)

export default router