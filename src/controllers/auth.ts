import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SESSION_SECRET!, {
    expiresIn: "1h",
  });
  res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};
