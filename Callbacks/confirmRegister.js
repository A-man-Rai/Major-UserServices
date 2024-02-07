
import User from "../Schema/userSchema.js";
import { verifyOTP } from "../helper/handleOtp.js";
import Secret from "../Schema/userSecretSchema.js";

const confirmRegister = async (req, res) => {
    const { firstname, surname, nationality, password, email, otp } = req.body;
    console.log(req.body);
    
    try {
        const existingUser = await Secret.findOne({ email: email });
         console.log(existingUser);
        if (existingUser) {
            const isValid =  await verifyOTP( otp.code,existingUser);
            console.log(isValid);
            if (isValid) {
                await User.create({
                    email: email,
                    firstname: firstname,
                    surname: surname,
                    nationality: nationality,
                    password: password,
                });

                return res.status(201).json({
                    message: "account created",
                    accountCreated:true,
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
                message: " Something Went Wrong",
                userNorFound: true,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: true,
        });
    }
};

export default confirmRegister;
