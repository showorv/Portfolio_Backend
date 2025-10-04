import AppError from "../../ErrorHelpers/AppError"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config"
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


const getAllProject = async ()=>{

    const projects = await Project.find().sort({createdAt: -1})

    const total = await Project.countDocuments()

    return {
        data: projects,
        metaData: {
            total
        }
    };
}

const getSingleProject = async (id: string)=>{

    const singleProject = await Project.findById(id)

    return singleProject

}


const deleteProject = async (id: string)=>{

    const project = await Project.findByIdAndDelete(id)

    return project

}


const updateProject = async (payload:Partial<IProject>,id: string)=>{

    const project = await Project.findById(id)

    if(!project){
        throw new AppError(401, "project not found")
    }




    const updateproject = await Project.findByIdAndUpdate(id, payload, {new: true, runValidators:true})

    if(payload.thumbnail && project.thumbnail){
        await cloudinaryDeleteUpload(project.thumbnail)
    }

    return updateproject

}



export const projectService = {createProject,getAllProject,getSingleProject,deleteProject,updateProject}