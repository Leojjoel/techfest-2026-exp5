import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.get("authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Authentication required" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("_id name email role");
    if (!user) return res.status(401).json({ message: "Invalid authentication" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired authentication" });
  }
}
