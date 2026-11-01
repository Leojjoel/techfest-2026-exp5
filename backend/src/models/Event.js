import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ["Technical", "Workshop", "Cultural", "Sports"] },
  fee: { type: Number, required: true, min: 0 },
  seats: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true }
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);
