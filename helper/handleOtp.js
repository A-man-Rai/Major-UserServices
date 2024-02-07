import crypto from "crypto"

function generateOTP() {
  const otpBuffer = crypto.randomBytes(3); 
  const otp = otpBuffer.toString('hex').toUpperCase().slice(0, 6);
  return otp;
}

async function verifyOTP(code,existingUser) {
  try {
    if (existingUser.otp === code && existingUser.otpExpiry > Date.now()) {
        console.log('Valid OTP');
        return true;
    } 
    else {
      console.log('Invalid OTP or expired');
      return false;
    }
  } catch (error) {
    console.error('Error verifying OTP', error.message);
    return false;
  }
}


export { generateOTP,verifyOTP };
