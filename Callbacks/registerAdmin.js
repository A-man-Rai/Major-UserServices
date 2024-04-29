import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const RegisterAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.admin.findFirst({ where: { email} });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "EMAIL ALREADY REGISTERED", alreadyRegistered: true });
    }
    
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    const response= await prisma.admin.create({data:{ email: email, password: hash}});
    console.log(response);
    return res
      .status(201)
      .json({ message: "account created", success: true });
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong", success: false });
  }
};

export default RegisterAdmin;
