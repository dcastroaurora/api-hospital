import { Router } from "express";
import { check } from "express-validator";
import validateParams from "../middlewares/validate-params";
import * as controller from "../controllers/search.controller";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.get("/collections/:paramSearch", validateJWT, controller.getCollections);
router.get(
  "/collection/:table/:paramSearch",
  validateJWT,
  controller.getCollection
);

export default router;
