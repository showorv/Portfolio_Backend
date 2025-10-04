import   { JwtPayload }  from "jsonwebtoken";

import { NextFunction, Request, Response} from "express";


import { envVars } from "../config/env";
import httpsCode from "http-status-codes"
import { User } from "../modules/auth/auth.model";
import AppError from "../ErrorHelpers/AppError";
import { verifiedToken } from "../utils/generateToken";



export const checkAuth = ()=>async(req:Request, res: Response, next: NextFunction)=>{

    try {
        const accessToken = req.headers.authorization || req.cookies["access-token"]

       
        

    if(!accessToken){
      throw new AppError(403,"access token undefined")
    }

    const verifiedTokens = verifiedToken(accessToken, envVars.JWT_SECRET as string) as JwtPayload

    const userExist = await User.findOne({email: verifiedTokens.email})

        if(!userExist){
          throw new AppError(httpsCode.BAD_REQUEST, "user not exist")
      }

     req.user = verifiedTokens

    next()
    
    } catch (error) {
        next(error)
    }
    
}