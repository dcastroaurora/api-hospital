import { Router } from "express";
import { check } from "express-validator";
import validateParams from "../middlewares/validate-params";
import * as controller from "../controllers/auth.controllers";

const router = Router();

router.post(
  "/login",
  [
    check("email", "Email required").isEmail(),
    check("password", "Password required").not().isEmpty(),
    validateParams,
  ],
  controller.login
);

export default router;
