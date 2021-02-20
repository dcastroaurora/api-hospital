import { Router } from "express";
import uploadFile from "express-fileupload";
import validateJWT from "../middlewares/validate-jwt";
import * as controller from "../controllers/upload.controllers";

const router = Router();

router.use(uploadFile());

router.post("/:collection/:id", validateJWT, controller.uploadFile);
router.get("/:collection/:id", controller.getFile);

export default router;
