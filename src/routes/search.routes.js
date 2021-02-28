import { Router } from "express";
import * as controller from "../controllers/search.controller";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get("/", validateJWT, controller.getCollections);
// router.get(
//   "/collection/:table/:paramSearch",
//   validateJWT,
//   controller.getCollection
// );

export default router;
