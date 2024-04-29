import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getPdfLinks = async (req, res) => {
  try {
    const userId  = req.params.id;
    const data=await prisma.pdf.findMany({
       where:{userId:parseInt(userId)}
    });
    return res.status(201).json({
        data
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
        message: "something went wrong"
      });
  }
};
export default getPdfLinks;
