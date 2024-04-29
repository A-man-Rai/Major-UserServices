import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const savePdfLink = async (req, res) => {
  try {
    const { name, link, userId } = req.body;
    await prisma.pdf.create({
      data: {
        name,
        link,
        userId,
      }
    });
    return res.status(201).json({
        message: "pdf link saved",
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
        message: "something went wrong"
      });
  }
};
export default savePdfLink;
