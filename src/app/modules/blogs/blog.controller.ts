import { Request, Response } from "express"
import { catchAsyncError } from "../../utils/catchAsyncError"
import { IBlog } from "./blog.interface";
import { blogService } from "./blog.service";



const createBlog = catchAsyncError(async(req: Request, res: Response)=>{

    const payload: IBlog = {
        ...req.body,
        thumbnail: req.file?.path
    }

    console.log(payload.thumbnail);

    const blog = await blogService.createBlog(payload)

   res.status(200).json({
        success: true,
        message: "blog created successfully",
        data: blog
    })

})

const getAllBlog = catchAsyncError(async(req: Request, res: Response)=>{

   

    const project = await blogService.getAllBlog()

   res.status(200).json({
        success: true,
        message: "blog retrived successfully",
        data: project.data,
        metaData: project.metaData
        
    })

})

const getSingleBlog = catchAsyncError(async(req: Request, res: Response)=>{

   const slug = req.params.slug

    const blog = await blogService.getSingleBlog(slug)

   res.status(200).json({
        success: true,
        message: "blog retrived successfully",
        data: blog
  
        
    })

})

const deleteBlog = catchAsyncError(async(req: Request, res: Response)=>{

   const id = req.params.id

    const project = await blogService.deleteBlog(id)

   res.status(200).json({
        success: true,
        message: "blog deleted successfully",
        data: project
  
        
    })

})


const updateBlog = catchAsyncError(async(req: Request, res: Response)=>{

    const payload: IBlog = {
        ...req.body,
        thumbnail: req.file?.path
    }

   const id = req.params.id

    const blog = await blogService.updateBlog( payload, id)

   res.status(200).json({
        success: true,
        message: "blog updated successfully",
        data: blog
  
        
    })

})




export const blogController = {createBlog,getAllBlog,getSingleBlog,deleteBlog,updateBlog}