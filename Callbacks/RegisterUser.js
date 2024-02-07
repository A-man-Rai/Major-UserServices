import User from "../Schema/userSchema.js";
import getOtp from "./otp.js";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const RegisterUser=async(req,res)=>{
  
    const{email,password}=req.body;
    try{
        const existingUser=await User.findOne({email:email});
        if(existingUser){
          return res.status(200).json({message:"EMAIL ALREADY REGISTERED", alreadyRegistered: true });
        }
        console.log("inside register callback");
        console.log(req.body);
        await getOtp(req,res,'register');
        console.log("send otp success");
        const hash = await bcrypt.hash(password, saltRounds);
        res.status(201).json({message:"otp send successfully", otpsend: true ,hash:hash});
     }
    catch(err){
        res.status(500).json({message:"Something Went Wrong", success: false })
    }
}


export default RegisterUser