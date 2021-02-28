import { Router } from "express";
import { check } from "express-validator";
import validateParams from "../middlewares/validate-params";
import { validateJWT } from "../middlewares/validate-jwt";
import * as controller from "../controllers/hospital.controller";

const routes = Router();

routes.get("/", validateJWT, controller.getHospitals);
routes.post(
  "/",
  [validateJWT, check("name", "Name required").not().isEmpty(), validateParams],
  controller.createHospital
);
// routes.get("/:id", validateJWT, controller.getHospital);
routes.get("/find", validateJWT, controller.findHospitals);
routes.put(
  "/:id",
  [validateJWT, check("name", "Name required").not().isEmpty(), validateParams],
  controller.updateHospital
);
routes.delete("/:id", validateJWT, controller.deleteHospital);

export default routes;
