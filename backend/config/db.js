import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.mongoURI);
    console.log(`mongodb connected with server ${res.connection.host}`)
  } catch (error) {
    console.log(error);
  }
};
