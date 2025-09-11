import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("Connected to MongoDB 🚀"))
        .catch(err => console.error("MongoDB connection error:", err));
}

export default connectDB;