import express from "express";
import registerRouter from "./registerRouter.js"
import forgotPasswordRouter from "./forgotPasswordRouter.js"
import LoginUser from "../Callbacks/LoginUser.js";
import confirmReset from "../Callbacks/confirmReset.js";
import adminRouter from "./adminRouter.js"
import getAllUsersData from "../Callbacks/getAllUsersData.js";
import { verifyToken } from "../Callbacks/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js"
import verifyUser from "../middleware/verifyUser.js"
import increaseCount from "../Callbacks/increateSubmitCount.js";
import savePdfLink from "../Callbacks/savePdfLink.js";
const router = express.Router();
import getPdfLinks from "../Callbacks/getPdfLinks.js";
//verify admin here
router.get("/user",verifyAdmin,getAllUsersData); //get all registered user for admin  //done

router.use("/admin",adminRouter)

router.use("/register",registerRouter)

router.post("/login", LoginUser); // checks valid user //done

router.use("/forgotpassword",forgotPasswordRouter) //done

router.post("/reset", confirmReset); //reset password //done

router.get("/verify", verifyToken); //done

router.post("/count",verifyUser,increaseCount)

router.post("/pdf",verifyAdmin,savePdfLink)

router.get("/pdf/:id",getPdfLinks)

export default router;
