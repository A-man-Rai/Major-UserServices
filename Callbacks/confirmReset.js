import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const confirmReset = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const hashPassword = await bcrypt.hash(newpassword, saltRounds);
    await prisma.user.update({
      where: { email },
      data: { password: hashPassword },
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Password reset successful.",
        reset: true,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default confirmReset;
