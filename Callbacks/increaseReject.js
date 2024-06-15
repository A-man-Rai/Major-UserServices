import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const increaseCount = async (req,res) => {
  try {
    const {userId}=req.body
    
    const currentUser = await prisma.user.findUnique({
      where: { id:userId },
    });

    if (currentUser && currentUser.reject !== undefined) {
      const newSubmittedValue = currentUser.reject+ 1;
    
     const updated= await prisma.user.update({
        where: { id:userId },
        data: { reject: newSubmittedValue },
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
