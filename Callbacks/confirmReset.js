import User from '../Schema/userSchema.js';

import bcrypt from "bcrypt";


const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

const confirmReset= async (req, res) => {
    try {
        const{email,newpassword}=req.body;
        const hashPassword = await bcrypt.hash(newpassword, saltRounds);
        await User.updateOne({ email }, { password: hashPassword });
        res.status(201).json({ success: true, message: 'Password reset successful.',reset:true});
    } 
    catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong.'});
    }
};

export default confirmReset;
