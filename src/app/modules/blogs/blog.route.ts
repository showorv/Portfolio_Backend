import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { multerUpload } from "../../config/multer.config";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";
import { blogController } from "./blog.controller";




const router = Router()

router.post("/create", multerUpload.single("file"), validateSchma(createBlogSchema), blogController.createBlog)
router.get("/",  blogController.getAllBlog)



router.get("/:slug",  blogController.getSingleBlog)

router.patch("/:id",  multerUpload.single("file"), validateSchma(updateBlogSchema),  blogController.updateBlog)
router.delete("/:id", blogController.deleteBlog)

export const blogRouter = router