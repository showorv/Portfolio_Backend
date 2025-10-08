import { Router } from "express";
import { messageController } from "./message.controller";




const router = Router()

router.post("/create", messageController.createMessage)


router.get("/",  messageController.getAllMessage)




export const messageRouter = router