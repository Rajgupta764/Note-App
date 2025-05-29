import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://raj76458kumar:Rajkumar@cluster0.rnnxwrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMongoDb;
