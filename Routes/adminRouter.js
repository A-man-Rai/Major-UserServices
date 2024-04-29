import express from "express"
import LoginAdmin from "../Callbacks/loginAdmin.js";
import RegisterAdmin from "../Callbacks/registerAdmin.js";

const router=express.Router()

router.post("/login", LoginAdmin); //sends otp to reset password

router.post("/register", RegisterAdmin); //verifies otp for password reset

export default router;