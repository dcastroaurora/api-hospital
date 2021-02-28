import { Router } from "express";
import { check } from "express-validator";
import validateParams from "../middlewares/validate-params";
import { validateJWT } from "../middlewares/validate-jwt";
import * as controller from "../controllers/doctor.controller";

const routes = Router();

routes.get("/", validateJWT, controller.getDoctors);
routes.post(
  "/",
  [
    validateJWT,
    check("name", "Name required").not().isEmpty(),
    check("hospitalId", "Hospital doesn't have a mongoId").isMongoId(),
    validateParams,
  ],
  controller.createDoctor
);
routes.get("/:id", validateJWT, controller.getDoctor);
routes.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name required").not().isEmpty(),
    check("hospitalId", "Hospital doesn't have a mongoId").isMongoId(),
    validateParams,
  ],
  controller.updateDoctor
);
routes.delete("/:id", validateJWT, controller.deleteDoctor);

export default routes;
