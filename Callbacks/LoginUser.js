import User from "../Schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret=process.env.JWT_SECRET;

const LoginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            const matchPassword=await bcrypt.compare(password,existingUser.password);
           if(!matchPassword){
             return res.status(200).json({message:"INVALID USERNAME OR PASSWORD",invalidUser:true});
           }
            const sanitizedUser = {
            id: existingUser._id,
            email: existingUser.email,
            firstname: existingUser.firstname,
            surname: existingUser.surname
              };
           const token=jwt.sign({email:existingUser.email,id:existingUser._id},secret,{ expiresIn: '1m' });
           res.status(200).json({user:sanitizedUser,token:token,message:"LOGGED IN SUCCESSFULLY",validUser:true});
        }
        else{
          return  res.status(200).json({message:"EMAIL IS NOT REGISTERED",invalidUser:true})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something Went Wrong"})
    }
}
export default LoginUser