import { Router } from "express";
import { Event } from "../models/Event.js";
export const eventRouter = Router();
eventRouter.get("/", async (_req, res, next) => {
  try { res.json(await Event.find().sort({ date: 1, name: 1 })); } catch (err) { next(err); }
});
