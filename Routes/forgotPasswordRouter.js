import express from "express"
import getOtp from "../Callbacks/getOtpToReset.js";
//import confirmOtp from "../Callbacks/confirmOtp.js";
import resetPassword from "../Callbacks/resetPassword.js";
const router=express.Router()

router.post("/", getOtp); //sends otp to reset password

router.post("/confirm", resetPassword); //verifies otp for password reset

export default router;