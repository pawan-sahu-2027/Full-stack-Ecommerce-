import mongoose from "mongoose";

const connectDB = async () =>{
    try {
         await mongoose.connect (`${process.env.MONGO_URL}Ecommerce-project`)
            console.log("MongoDb connected successfully")
        }
    catch (error){

        console.log("Error mongoDb connection failed" , error)
    }

}

export default connectDB;   