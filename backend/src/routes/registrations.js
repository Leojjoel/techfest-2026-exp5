import { Router } from "express";
import { Registration } from "../models/Registration.js";
import { Event } from "../models/Event.js";
import { requireAuth } from "../middleware/auth.js";

export const registrationRouter = Router();

registrationRouter.post("/", requireAuth, async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.seats <= 0) return res.status(409).json({ message: "Event is sold out" });
    const existing = await Registration.findOne({ user: req.user._id, event: event._id });
    if (existing) return res.status(409).json({ message: "Already registered for this event" });
    const registration = await Registration.create({ user: req.user._id, event: event._id });
    event.seats -= 1;
    await event.save();
    res.status(201).json({ message: "Registered successfully!", registration });
  } catch (err) { next(err); }
});

registrationRouter.get("/my", requireAuth, async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user: req.user._id }).populate("event").sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) { next(err); }
});

registrationRouter.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const registration = await Registration.findOne({ _id: req.params.id, user: req.user._id });
    if (!registration) return res.status(404).json({ message: "Registration not found" });
    await Event.findByIdAndUpdate(registration.event, { $inc: { seats: 1 } });
    await registration.deleteOne();
    res.json({ message: "Registration cancelled successfully." });
  } catch (err) { next(err); }
});
