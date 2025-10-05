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


const getAllBlog = async (query: Record<string,string>)=>{

    const filter = query

    const page = Number(query.page) || 1
    const limit = Number(query.limit)  || 5

    const skip = (page-1 ) * limit

    delete filter["page"]
    delete filter["limit"]
    delete filter["skip"]



    const blogs = await Blog.find(filter).sort({createdAt: -1}).limit(limit).skip(skip)

    const total = await Blog.countDocuments()

    const totalPage = Math.ceil(total/limit)

    const meta = {
        page,
        limit,
        totalPage,
        total
    }

    return {
        data: blogs,
        metaData: meta
    };
}

const getSingleBlog = async (slug: string)=>{

    const singleblog = await Blog.findOne({slug})

    return singleblog

}


const deleteBlog = async (id: string)=>{

    const blog = await Blog.findByIdAndDelete(id)

    return blog
blog
}


const updateBlog = async (payload:Partial<IBlog>,id: string)=>{

    const blog = await Blog.findById(id)

    if(!blog){
        throw new AppError(401, "blog not found")
    }




    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {new: true, runValidators:true})

    if(payload.thumbnail && blog.thumbnail){
        await cloudinaryDeleteUpload(blog.thumbnail)
    }

    return updatedBlog

}



export const blogService = {createBlog,getAllBlog,getSingleBlog,deleteBlog,updateBlog}