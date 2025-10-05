import AppError from "../../ErrorHelpers/AppError"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config"
import { ISkill, Skill } from "./skill.model"



const createSkill = async (payload: Partial<ISkill>)=>{

    const existProject = await Skill.findOne({name: payload.name})

    if(existProject){
        throw new AppError(401, "skill already exist")
    }

    const skill = await Skill.create(payload)

    return skill

    


}


const getAllSkill = async ()=>{

    

    const skills = await Skill.find().sort({createdAt: -1})

    const total = await Skill.countDocuments()

    return {
        data: skills,
        metaData: {
            total
        }
    };
}


const deleteSkill = async (id: string)=>{

    const skill = await Skill.findByIdAndDelete(id)

    return skill

}




export const skillService = {createSkill,getAllSkill,deleteSkill}