import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/catchAsyncError"

import { skillService } from "./skill.service";
import { ISkill } from "./skill.model";



const createSkill = catchAsyncError(async(req: Request, res: Response)=>{

    const payload: ISkill = { ...req.body }

    if (req.file?.path) payload.thumbnail = req.file.path

    

    const skill = await skillService.createSkill(payload)

   res.status(200).json({
        success: true,
        message: "skill created successfully",
        data: skill
    })

})

const getAllSkill = catchAsyncError(async(req: Request, res: Response)=>{

   

    const skill = await skillService.getAllSkill()

   res.status(200).json({
        success: true,
        message: "skill retrived successfully",
        data: skill.data,
        metaData: skill.metaData
        
    })

})



const updateSkill = catchAsyncError(async(req: Request, res: Response)=>{

    const payload: Partial<ISkill> = { ...req.body }

    if (req.file?.path) payload.thumbnail = req.file.path

    const skill = await skillService.updateSkill(payload, req.params.id)

   res.status(200).json({
        success: true,
        message: "skill updated successfully",
        data: skill
    })

})

const deleteSkill = catchAsyncError(async(req: Request, res: Response)=>{

   const id = req.params.id

    const skill = await skillService.deleteSkill(id)

   res.status(200).json({
        success: true,
        message: "skill deleted successfully",
        data: skill
  
        
    })

})





export const skillController = {updateSkill,createSkill,getAllSkill,deleteSkill}