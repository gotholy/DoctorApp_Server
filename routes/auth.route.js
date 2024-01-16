import express from "express";
import { login, register } from "../controller/auth.controller.js";

const router = new express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/logout")

export default router