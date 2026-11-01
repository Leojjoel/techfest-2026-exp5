import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";

export const authRouter = Router();

const validateRegistration = [
  body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 8, max: 72 }).withMessage("Password must be 8-72 characters")
];
const validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ min: 1, max: 72 })
];

function checkValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

function createToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "2h" });
}

function userResponse(user, token) {
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role }, name: user.name, role: user.role };
}

authRouter.post("/register", validateRegistration, checkValidation, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    res.status(201).json(userResponse(user, createToken(user)));
  } catch (err) { next(err); }
});

authRouter.post("/login", validateLogin, checkValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json(userResponse(user, createToken(user)));
  } catch (err) { next(err); }
});
