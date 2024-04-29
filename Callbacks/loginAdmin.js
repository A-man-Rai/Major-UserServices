import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET_ADMIN;

const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.admin.findFirst({ where: { email} });
    if (existingUser) {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        return res
          .status(200)
          .json({ message: "INVALID USERNAME OR PASSWORD", success: false });
      }
      const sanitizedUser = {
        id: existingUser._id,
        email: existingUser.email,
      };
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id, type: "admin" },
        secret,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({
          user: sanitizedUser,
          token: token,
          message: "LOGGED IN SUCCESSFULLY",
          success: true,
        });
    } else {
      return res
        .status(200)
        .json({ message: "EMAIL IS NOT REGISTERED", success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
export default LoginAdmin;
