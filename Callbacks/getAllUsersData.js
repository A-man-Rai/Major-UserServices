import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllUsersData = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
     select:{
        id:true,
        email:true,
      firstName:true,
       surname:true,
       nationality:true,
      submitted:true} });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users data:", error);
    res.status(500).send("Error retrieving users data");
  }
};

export default getAllUsersData;
