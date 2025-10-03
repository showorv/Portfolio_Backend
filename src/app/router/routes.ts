import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";


export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        router: authRouter
    }
]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.router)
})