import { Router } from "express";
import { check } from "express-validator";
import validateParams from "../middlewares/validate-params";
import * as controller from "../controllers/user.controllers";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.get("/", validateJWT, controller.getUsers);
router.post(
  "/",
  [
    check("name", "Name required").not().isEmpty(),
    check("password", "Password required").not().isEmpty(),
    check("email", "Email required").isEmail(),
    validateParams,
  ],
  controller.createUser
);
router.get("/:id", controller.getUser);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name required").not().isEmpty(),
    check("email", "Email required").isEmail(),
    // check("role", "El role es obligatorio").not().isEmpty(),
    validateParams,
  ],
  controller.updateUser
);
router.delete("/:id", validateJWT, controller.deleteUser);

export default router;
