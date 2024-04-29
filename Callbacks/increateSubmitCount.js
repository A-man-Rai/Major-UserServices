import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const increaseCount = async (req,res) => {
  try {
    const {email}=req.body
    const currentUser = await prisma.user.findUnique({
      where: { email },
    });

    if (currentUser && currentUser.submitted !== undefined) {
      const newSubmittedValue = currentUser.submitted + 1;

      await prisma.user.update({
        where: { email },
        data: { submitted: newSubmittedValue },
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
