

import { verifyOTP } from "../helper/handleOtp.js";
import Secret from "../Schema/userSecretSchema.js";

const confirmOtp = async (req, res) => {
    const {email,code } = req.body;
    try {
        const existingSecret = await Secret.findOne({ email: email });
         console.log(existingSecret);
         if (existingSecret) {
            console.log(req.body);
            const isValid =await verifyOTP(code,existingSecret);
            console.log(isValid);
            if (isValid) {
                return res.status(201).json({
                    message: "otp valid",
                    validOtp:true,
                });
            } else {
                console.log("otp error");
                return res.status(201).json({
                    message: "confirmation code error",
                    wrongCode:true,
                });
            }
        } else {
            
            return res.status(400).json({
                message: " Something Went Wrong Here",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
};

export default confirmOtp;
