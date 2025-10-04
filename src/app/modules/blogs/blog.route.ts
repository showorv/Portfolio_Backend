import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { multerUpload } from "../../config/multer.config";
import { createBlogSchema } from "./blog.validation";
import { blogController } from "./blog.controller";




const router = Router()

router.post("/create", checkAuth(), multerUpload.single("file"), validateSchma(createBlogSchema), blogController.createBlog)
// router.get("/",  projectController.getAllProject)



// router.get("/:id",  projectController.getSingleProject)
// router.patch("/:id", checkAuth(), multerUpload.single("file"), validateSchma(updatedZodSchema),  projectController.updateProject)
// router.delete("/:id",  projectController.deleteProject)

export const blogRouter = router