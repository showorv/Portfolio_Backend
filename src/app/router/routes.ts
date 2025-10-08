import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { projectRouter } from "../modules/projects/project.route";
import { blogRouter } from "../modules/blogs/blog.route";
import { skillRouter } from "../modules/skills/skill.route";
import { messageRouter } from "../modules/message/message.route";


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
    {
        path: "/skill",
        router: skillRouter
    },

    {
        path: "/message",
        router: messageRouter
    },
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.router)
})