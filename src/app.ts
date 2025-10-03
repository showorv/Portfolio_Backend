import express, { Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { envVars } from "./app/config/env"
import { router } from "./app/router/routes"


const app: Application = express()


app.use(cookieParser())
app.use(express.json())
app.set("trust proxy", 1)
app.use(express.urlencoded({extended: true})) // for read form-data

app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))

app.use("/api/v1", router)

app.get("/", (req: Request,res: Response)=>{
    res.status(200).json({
        message: "Welcome to Portfolio Backend"
    })
    
})

export default app;