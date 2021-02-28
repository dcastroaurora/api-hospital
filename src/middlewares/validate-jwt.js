import { response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

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

const validateAdminRole = async (req, res = response, next) => {
  const loginId = req.id;
  const paramsId = req.params.id;

  const user = await User.findById(loginId);

  if (!user) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  if (user.role === "ADMIN_ROLE" || loginId === paramsId) {
    next();
  } else {
    return res.status(403).json({
      message: "Insufficient privileges",
    });
  }
};

export { validateJWT, validateAdminRole };
