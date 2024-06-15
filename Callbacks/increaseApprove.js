import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const increaseCount = async (req,res) => {
  try {
    const {userId}=req.body
    const currentUser = await prisma.user.findUnique({
      where: { id:userId },
    });

    if (currentUser && currentUser.approved  !== undefined) {
      const newSubmittedValue = currentUser.approved + 1;

      await prisma.user.update({
        where: { id:userId},
        data: { approved: newSubmittedValue },
      });
      res.status(200).json({
        success: true,
        message: "Count increased",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export default increaseCount;
