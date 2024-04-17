import { verifyOTP } from "../helper/handleOtp.js";
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const confirmRegister = async (req, res) => {
  const { firstname, surname, nationality, password, email, otp } = req.body;
  console.log(req.body);
  try {
    
    const existingUser = await prisma.secret.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      const isValid = await verifyOTP(existingUser,otp.code );
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
      const hash = await bcrypt.hash(password, saltRounds);
      if (isValid) {
        await prisma.user.create({
          data:{email,
          firstName:firstname,
          surname,
          nationality,
          password:hash
        }
        });

        return res.status(201).json({
          message: "account created",
          accountCreated: true,
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
        message: " Something Went Wrong",
        userNorFound: true,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
      error: true,
    });
  }
};

export default confirmRegister;
