import User from '../Schema/userSchema.js';
import { verifyTOTP } from '../helper/handleOtp.js';



const resetPassword = async (req, res) => {
    try {
        const{email,otp}=req.body
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const isValid = verifyTOTP(existingUser.secret, otp);
            if (isValid) {
                // OTP is valid
                res.status(201).json({ success: true, message: 'Make Sure to Keep Strong Password' });
            } else {
                res.status(400).json({ success: false, message: 'The number that you\'ve entered doesn\'t match your code. Please try again.' });
            }
        } else {
            res.status(400).json({ success: false, message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

export default resetPassword;
