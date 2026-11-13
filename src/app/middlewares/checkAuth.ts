import   { JwtPayload }  from "jsonwebtoken";

import { NextFunction, Request, Response} from "express";


import { envVars } from "../config/env";
import httpsCode from "http-status-codes"
import { User } from "../modules/auth/auth.model";
import AppError from "../ErrorHelpers/AppError";
import { verifiedToken } from "../utils/generateToken";



export const checkAuth = ()=>async(req:Request, res: Response, next: NextFunction)=>{

    try {
        // accepts "Bearer <token>", a bare token, or the accessToken cookie
        const accessToken = req.headers.authorization?.replace(/^Bearer\s+/i, "") || req.cookies["accessToken"]

       
        

    if(!accessToken){
      throw new AppError(401,"access token undefined")
    }

    let verifiedTokens: JwtPayload

    try {
        verifiedTokens = verifiedToken(accessToken, envVars.JWT_SECRET as string) as JwtPayload
    } catch {
        throw new AppError(401, "session expired, please login again")
    }

    const userExist = await User.findOne({email: verifiedTokens.email})

        if(!userExist){
          throw new AppError(httpsCode.UNAUTHORIZED, "user not exist")
      }

     req.user = verifiedTokens

    next()
    
    } catch (error) {
        next(error)
    }
    
}