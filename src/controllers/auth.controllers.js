import { response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/jwt";

export const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "There was an error when logging in",
    });
  }
};
