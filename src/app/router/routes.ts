import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { projectRouter } from "../modules/projects/project.route";
import { siteRouter } from "../modules/site/site.route";
import { skillRouter } from "../modules/skills/skill.route";
import { messageRouter } from "../modules/message/message.route";
import { mediaRouter } from "../modules/media/media.route";
import { statsRouter } from "../modules/stats/stats.route";


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
        path: "/site",
        router: siteRouter
    },
    {
        path: "/skill",
        router: skillRouter
    },

    {
        path: "/message",
        router: messageRouter
    },
    {
        path: "/media",
        router: mediaRouter
    },
    {
        path: "/stats",
        router: statsRouter
    },
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.router)
})