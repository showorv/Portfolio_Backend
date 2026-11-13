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






const updateMessage = async (id: string, isRead: boolean)=>{

    const message = await Message.findByIdAndUpdate(id, { isRead }, { new: true })

    if(!message){
        throw new AppError(404, "message not found")
    }

    return message
}

const deleteMessage = async (id: string)=>{

    const message = await Message.findByIdAndDelete(id)

    if(!message){
        throw new AppError(404, "message not found")
    }

    return message
}

export const messageService = {createMessage,getAllMessage,updateMessage,deleteMessage}