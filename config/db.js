import mongoose from "mongoose";

const connectDB = async () => {
  // Vérification que la variable existe
  if (!process.env.MONGODB_URL) {
    console.error("❌ MONGODB_URL is not defined in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;