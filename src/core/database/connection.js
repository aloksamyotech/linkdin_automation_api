import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    (async function () {
      const dbUri = process.env.DB_URL;
      await mongoose.connect(dbUri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      });
      console.log("database connected successfully")
    })();
  } catch (error) {
    console.error("database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
