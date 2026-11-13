import { Router } from "express";
import { messageController } from "./message.controller";
import { checkAuth } from "../../middlewares/checkAuth";




const router = Router()

router.post("/create", messageController.createMessage)


router.get("/", checkAuth(), messageController.getAllMessage)

router.patch("/:id", checkAuth(), messageController.updateMessage)

router.delete("/:id", checkAuth(), messageController.deleteMessage)




export const messageRouter = router