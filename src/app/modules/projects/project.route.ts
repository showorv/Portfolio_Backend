import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { projectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { projectValidationSchema, updatedZodSchema } from "./project.validation";




const router = Router()

router.post("/create",  multerUpload.single("file"), validateSchma(projectValidationSchema), projectController.createProject)
router.get("/",  projectController.getAllProject)



router.get("/:id",  projectController.getSingleProject)
router.patch("/:id",  multerUpload.single("file"), validateSchma(updatedZodSchema),  projectController.updateProject)
router.delete("/:id", projectController.deleteProject)

export const projectRouter = router