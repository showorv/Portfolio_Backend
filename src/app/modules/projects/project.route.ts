import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { projectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { projectValidationSchema } from "./project.validation";




const router = Router()

router.post("/create", checkAuth(), multerUpload.single("file"), validateSchma(projectValidationSchema), projectController.createProject)

export const projectRouter = router