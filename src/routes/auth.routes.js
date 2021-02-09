import { Router } from "express";
import { check } from "express-validator";
import validateParams from "../middlewares/validate-params";
import validateJWT from "../middlewares/validate-jwt";
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

router.post(
  "/google",
  [check("token", "Token required").not().isEmpty(), validateParams],
  controller.google
);

router.get("/renewToken", validateJWT, controller.renewToken);

export default router;
