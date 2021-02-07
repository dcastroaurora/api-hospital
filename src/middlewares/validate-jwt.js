import { response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  try {
    const { id } = jwt.verify(token, config.jwt_secret);
    req.id = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default validateJWT;
