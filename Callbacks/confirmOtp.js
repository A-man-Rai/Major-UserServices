import { verifyOTP } from "../helper/handleOtp.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const confirmOtp = async (req, res) => {
  const { email, code } = req.body;
  try {
    const existingSecret = await prisma.secret.findFirst({
      where: { email: email },
    });
    if (existingSecret) {
      console.log(req.body);
      const isValid = await verifyOTP(existingSecret,code);
      console.log(isValid);
      if (isValid) {
        return res.status(201).json({
          message: "otp valid",
          validOtp: true,
        });
      } else {
        console.log("otp error");
        return res.status(201).json({
          message: "confirmation code error",
          wrongCode: true,
        });
      }
    } else {
      return res.status(400).json({
        message: " Something Went Wrong Here",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export default confirmOtp;
