import express from "express";
import registerRouter from "./registerRouter.js"
import forgotPasswordRouter from "./forgotPasswordRouter.js"
import LoginUser from "../Callbacks/LoginUser.js";
import confirmReset from "../Callbacks/confirmReset.js";

import getAllUsersData from "../Callbacks/getAllUsersData.js";
import { verifyToken } from "../Callbacks/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js"
const router = express.Router();

//verify admin here
router.get("/user",  getAllUsersData); //get all registered user for admin  //done

router.use("/register",registerRouter)

router.post("/login", LoginUser); // checks valid user //done

router.use("/forgotpassword",forgotPasswordRouter) //done

router.post("/reset", confirmReset); //reset password //done

router.get("/verify", verifyToken); //done


export default router;
