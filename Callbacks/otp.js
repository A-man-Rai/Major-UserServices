import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { generateOTP } from "../helper/handleOtp.js";
import messages from "../helper/message.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getOtp = async (req, res, type) => {
  let data;
  if (req) {
    data = req.body;
  }

  console.log(data);

  const { firstname, surname, email } = data || {};

  const Message = messages.find((message) => message.type === type);

  try {
    const otp = generateOTP();
    console.log(otp);

    const existingSecret = await prisma.secret.findUnique({ where: { email } });
    const otpExpiry= Date.now() + 5 * 60 * 1000 +" ";
    if (existingSecret!==null) {
      await prisma.secret.update({
        where: { email },
        data: { otp, otpExpiry },
      });
      console.log("User Secret updated successfully");
    } else {
      
      await prisma.secret.create({
        data: { email, otp, otpExpiry},
      });
      console.log("New User Secret created successfully");
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "arai99981@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Permit Application",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: `${firstname} ${surname}`,
        intro: Message.intro,
        table: {
          data: [
            {
              otp,
            },
          ],
        },
        outro: Message.outro,
      },
    };

    let mail = MailGenerator.generate(response);
    let message = {
      from: "arai99981@gmail.com",
      to: email,
      subject: Message.subject,
      html: mail,
    };

    const send = await transporter.sendMail(message);
    if (send) {
      console.log("email send successfully");
    } else {
      console.log("error while sending email");
    }
  } catch (err) {
    console.log(err);
  }
};

export default getOtp;
