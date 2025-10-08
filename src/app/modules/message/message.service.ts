import AppError from "../../ErrorHelpers/AppError"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config"
import { IMessage } from "./message.interface"
import { Message } from "./message.model"



const createMessage = async (payload: Partial<IMessage>)=>{


    const message = await Message.create(payload)

    return message

    


}


const getAllMessage = async ()=>{

    

    const message = await Message.find().sort({createdAt: -1})

    const total = await Message.countDocuments()

    return {
        data: message,
        metaData: {
            total
        }
    };
}






export const messageService = {createMessage,getAllMessage}