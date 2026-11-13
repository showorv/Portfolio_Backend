import AppError from "../../ErrorHelpers/AppError"
import { IProject } from "./project.interface"
import { Project } from "./project.model"


const createProject = async (payload: Partial<IProject>)=>{

    const existProject = await Project.findOne({name: payload.title})

    if(existProject){
        throw new AppError(401, "project already exist")
    }

    // new projects go to the top of the list. projects saved before ordering
    // existed have no order field, which sorts ahead of any number, so give
    // them one first.
    await Project.updateMany({ order: { $exists: false } }, { $set: { order: 0 } })
    const first = await Project.findOne().sort({ order: 1 }).select("order")

    const project = await Project.create({ ...payload, order: (first?.order ?? 0) - 1 })

    return project

    


}


const getAllProject = async ()=>{

    // manual order first; ties (and projects never ordered) fall back to newest first
    const projects = await Project.find().sort({order: 1, createdAt: -1})

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

    // the previous thumbnail stays in the media library; remove it from there if unwanted

    return updateproject

}



// ids arrive in the order the admin wants them shown
const reorderProjects = async (ids: string[])=>{

    await Project.bulkWrite(
        ids.map((id, index) => ({
            updateOne: { filter: { _id: id }, update: { $set: { order: index + 1 } } },
        }))
    )

    return ids.length
}

export const projectService = {reorderProjects,createProject,getAllProject,getSingleProject,deleteProject,updateProject}