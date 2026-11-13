import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router()

router.post("/", authController.login)
router.post("/logout", authController.logout)

router.get("/",checkAuth(), authController.getMe)

router.post("/change-password", checkAuth(), authController.changePassword)

export const authRouter = router