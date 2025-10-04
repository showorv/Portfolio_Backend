import AppError from "../../ErrorHelpers/AppError"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config"
import { IBlog } from "./blog.interface"
import { Blog } from "./blog.model,"



const createBlog = async (payload: Partial<IBlog>)=>{

    const existProject = await Blog.findOne({name: payload.title})

    if(existProject){
        throw new AppError(401, "blog already exist")
    }

    const project = await Blog.create(payload)

    return project

    


}


// const getAllProject = async ()=>{

//     const projects = await Project.find()

//     const total = await Project.countDocuments()

//     return {
//         data: projects,
//         metaData: {
//             total
//         }
//     };
// }

// const getSingleProject = async (id: string)=>{

//     const singleProject = await Project.findById(id)

//     return singleProject

// }


// const deleteProject = async (id: string)=>{

//     const project = await Project.findByIdAndDelete(id)

//     return project

// }


// const updateProject = async (payload:Partial<IProject>,id: string)=>{

//     const project = await Project.findById(id)

//     if(!project){
//         throw new AppError(401, "project not found")
//     }




//     const updateproject = await Project.findByIdAndUpdate(id, payload, {new: true, runValidators:true})

//     if(payload.thumbnail && project.thumbnail){
//         await cloudinaryDeleteUpload(project.thumbnail)
//     }

//     return updateproject

// }



export const blogService = {createBlog}