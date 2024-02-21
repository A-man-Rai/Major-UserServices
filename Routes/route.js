import express from "express";
import RegisterUser from "../Callbacks/RegisterUser.js";
import LoginUser from "../Callbacks/LoginUser.js";
import confirmRegister from "../Callbacks/confirmRegister.js";
import confirmReset from "../Callbacks/confirmReset.js";
import getOtp from "../Callbacks/getOtpToReset.js"
import confirmOtp from "../Callbacks/confirmOtp.js";
import getAllUsersData from "../Callbacks/getAllUsersData.js";

const router = express.Router();

router.get("/user",getAllUsersData) //get all registered user for admin

router.post("/register",RegisterUser);//sends otp via mail during regestration

router.post("/register/confirm",confirmRegister);// verifies the otp during registration

router.post("/login",LoginUser); // checks valid user

router.post("/forgotpassword",getOtp);//sends otp to reset password
router.post("/forgotpassword/confirm",confirmOtp);//verifies otp for password reset
router.post("/reset",confirmReset)  //reset password

export default router;
