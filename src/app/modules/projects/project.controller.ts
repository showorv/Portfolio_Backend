import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/catchAsyncError"
import { IProject } from "./project.interface"
import { projectService } from "./project.service"


const createProject = catchAsyncError(async(req: Request, res: Response)=>{

    const payload: IProject = {
        ...req.body,
        thumbnail: req.file?.path
    }

    console.log(payload.thumbnail);

    const project = await projectService.createProject(payload)

   res.status(200).json({
        success: true,
        message: "project created successfully",
        data: project
    })

})

const getAllProject = catchAsyncError(async(req: Request, res: Response)=>{

   

    const project = await projectService.getAllProject()

   res.status(200).json({
        success: true,
        message: "project retrived successfully",
        data: project.data,
        metaData: project.metaData
        
    })

})

const getSingleProject = catchAsyncError(async(req: Request, res: Response)=>{

   const id = req.params.id

    const project = await projectService.getSingleProject(id)

   res.status(200).json({
        success: true,
        message: "project retrived successfully",
        data: project
  
        
    })

})

const deleteProject = catchAsyncError(async(req: Request, res: Response)=>{

   const id = req.params.id

    const project = await projectService.deleteProject(id)

   res.status(200).json({
        success: true,
        message: "project deleted successfully",
        data: project
  
        
    })

})


const updateProject = catchAsyncError(async(req: Request, res: Response)=>{

    const payload: IProject = {
        ...req.body,
        thumbnail: req.file?.path
    }

   const id = req.params.id

    const project = await projectService.updateProject( payload, id)

   res.status(200).json({
        success: true,
        message: "project updated successfully",
        data: project
  
        
    })

})




export const projectController = {createProject,getAllProject,getSingleProject,deleteProject,updateProject}