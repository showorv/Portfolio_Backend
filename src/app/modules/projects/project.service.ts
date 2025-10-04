import AppError from "../../ErrorHelpers/AppError"
import { IProject } from "./project.interface"
import { Project } from "./project.model"


const createProject = async (payload: Partial<IProject>)=>{

    const existProject = await Project.findOne({name: payload.title})

    if(existProject){
        throw new AppError(401, "project already exist")
    }

    const project = await Project.create(payload)

    return project

    


}




export const projectService = {createProject}