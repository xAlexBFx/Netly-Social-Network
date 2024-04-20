import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('>>> DB connected')
    } catch (err) {
        console.log(err)
    }
};