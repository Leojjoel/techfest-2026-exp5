import "dotenv/config";
import mongoose from "mongoose";
import { Event } from "../src/models/Event.js";

const events = [
  { name: "Coding Contest", category: "Technical", fee: 100, seats: 50, date: "2026-11-10" },
  { name: "Web Dev Workshop", category: "Workshop", fee: 300, seats: 60, date: "2026-11-10" },
  { name: "Robotics Challenge", category: "Technical", fee: 700, seats: 25, date: "2026-11-11" },
  { name: "Cultural Night", category: "Cultural", fee: 0, seats: 200, date: "2026-11-12" },
  { name: "Football Tournament", category: "Sports", fee: 150, seats: 80, date: "2026-11-11" }
];

try {
  await mongoose.connect(process.env.MONGO_URI);
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log(`Seeded ${events.length} events.`);
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
