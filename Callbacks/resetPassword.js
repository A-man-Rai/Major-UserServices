import { verifyOTP } from "../helper/handleOtp.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resetPassword = async (req, res) => {
  try {
    const { email, code } = req.body;
  //  console.log(req.body);
    const existingUser = await prisma.secret.findFirst({ where: { email } });
    if (existingUser) {
      const isValid = await verifyOTP(existingUser, code);
      console.log(isValid);
      if (isValid) {
        // OTP is valid
        res.status(201).json({
          validOtp: true,
          message: "Make Sure to Keep Strong Password",
        });
      } else {
        res.status(201).json({
          wrongCode: true,
          message:
            "The number that you've entered doesn't match your code. Please try again.",
        });
      }
    } else {
      res.status(400).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default resetPassword;
