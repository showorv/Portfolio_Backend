import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { projectController } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { projectValidationSchema, reorderProjectSchema, updatedZodSchema } from "./project.validation";




const router = Router()

router.post("/create", checkAuth(), multerUpload.single("file"), validateSchma(projectValidationSchema), projectController.createProject)
router.get("/",  projectController.getAllProject)



router.get("/:id",  projectController.getSingleProject)
// must stay above "/:id" or "reorder" would be read as an id
router.patch("/reorder", checkAuth(), validateSchma(reorderProjectSchema), projectController.reorderProjects)
router.patch("/:id", checkAuth(), multerUpload.single("file"), validateSchma(updatedZodSchema),  projectController.updateProject)
router.delete("/:id", checkAuth(), projectController.deleteProject)

export const projectRouter = router