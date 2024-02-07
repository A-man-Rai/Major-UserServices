import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import {generateOTP } from '../helper/handleOtp.js';
import Secret from '../Schema/userSecretSchema.js';
import messages from "../helper/message.js";
import User from '../Schema/userSchema.js';
const getOtp = async (req, res) => {
 
  const { email } = req.body;
 
  const Message = messages.find(message => message.type === 'forgotPassword');
   const existingUser=await User.findOne({email:email});
   if(!existingUser){
    return res.status(200).json({message:"invalid user",invalidEmail:true});
   }
   const{firstname,surname}=existingUser;
  try {

    // save user secret for future otp validation
    const otp = generateOTP();
    console.log(otp);
    const result = await Secret.findOneAndUpdate(
      { email: email },
      { $set: { otp: otp, otpExpiry: Date.now() + 5 * 60 * 1000 } },
      { upsert: true, new: true }
    );
  
    if (result) {
      console.log('User Secret updated successfully');
    } else {
      console.log('New User Secret created successfully');
    }

   
    let transporter = nodemailer.createTransport({
      service: 'gmail',
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
        link: 'https://mailgen.js/',
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

    transporter.sendMail(message)
      .then(() => {
         return res.status(200).json({message:"email send succesfully",otpsend:true});
      })
      .catch(error => {
        console.log("error while sending email",error.message);
      });
  } catch (err) {
    console.log(err)
  }
};

export default getOtp;
