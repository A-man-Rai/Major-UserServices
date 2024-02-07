import mongoose from "mongoose";

const secretSchema = new mongoose.Schema({
  email: {
    type:String,
    unique: true,
    required: true,
  },
  otp:{
    type:String,
    required:true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
});

const Secret = mongoose.model("Secret", secretSchema);

export default Secret;
