import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./app.js";

const PORT = process.env.PORT || 5000;
const app = createApp();

async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not configured");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

start();
