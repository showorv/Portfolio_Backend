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

export const projectController = {createProject}