import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../config/multer.config";
import { validateSchma } from "../../middlewares/validationSchema";
import { createSkillSchema } from "./skills.validation";
import { skillController } from "./skill.controller";






const router = Router()

router.post("/create", checkAuth(), multerUpload.single("file"), validateSchma(createSkillSchema), skillController.createSkill)


router.get("/",  skillController.getAllSkill)

router.delete("/:id",checkAuth(),  skillController.deleteSkill)


export const skillRouter = router