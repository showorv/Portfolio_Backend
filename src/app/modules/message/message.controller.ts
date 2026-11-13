import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/catchAsyncError"
import { messageService } from "./message.service"





const createMessage = catchAsyncError(async(req: Request, res: Response)=>{

  

    // only the public fields: a visitor must not be able to set isRead
    const { name, email, subject, description } = req.body

    const message = await messageService.createMessage({ name, email, subject, description })

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








const updateMessage = catchAsyncError(async(req: Request, res: Response)=>{

    const message = await messageService.updateMessage(req.params.id, Boolean(req.body?.isRead))

   res.status(200).json({
        success: true,
        message: "message updated successfully",
        data: message
    })

})

const deleteMessage = catchAsyncError(async(req: Request, res: Response)=>{

    const message = await messageService.deleteMessage(req.params.id)

   res.status(200).json({
        success: true,
        message: "message deleted successfully",
        data: message
    })

})

export const messageController = {createMessage,getAllMessage,updateMessage,deleteMessage}