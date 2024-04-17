import express from "express"
import RegisterUser from "../Callbacks/RegisterUser.js";
import confirmRegister from "../Callbacks/confirmRegister.js";

const router=express.Router()

router.post("/", RegisterUser); //sends otp via mail during registration
router.post("/confirm", confirmRegister); // verifies the otp during registration

export default router