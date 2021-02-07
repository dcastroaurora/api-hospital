import { response } from "express";
import { validationResult } from "express-validator";

const validateParams = (req, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped(),
    });
  }
  next();
};

export default validateParams;
