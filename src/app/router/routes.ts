import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { projectRouter } from "../modules/projects/project.route";


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
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.router)
})