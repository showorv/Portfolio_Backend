import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { projectRouter } from "../modules/projects/project.route";
import { blogRouter } from "../modules/blogs/blog.route";


export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        router: authRouter
    },
    {
        path: "/project",
        router: projectRouter
    },
    {
        path: "/blog",
        router: blogRouter
    },
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.router)
})