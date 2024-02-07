import mongoose from "mongoose";
import 'dotenv/config';

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const Connection =async() => {
    try{
      await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ey688mg.mongodb.net/UserServiceDB`);
       console.log("DATABASE CONNECTED ");
    }
    catch(error){
     console.log(error.message);
    }
  }


export default Connection;