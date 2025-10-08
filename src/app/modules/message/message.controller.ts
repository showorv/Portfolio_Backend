import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/catchAsyncError"
import { messageService } from "./message.service"





const createMessage = catchAsyncError(async(req: Request, res: Response)=>{

  

    const message = await messageService.createMessage(req.body)

   res.status(200).json({
        success: true,
        message: "message created successfully",
        data: message
    })

})

const getAllMessage = catchAsyncError(async(req: Request, res: Response)=>{

   

    const message = await messageService.getAllMessage()

   res.status(200).json({
        success: true,
        message: "message retrived successfully",
        data: message.data,
        metaData: message.metaData
        
    })

})








export const messageController = {createMessage,getAllMessage}