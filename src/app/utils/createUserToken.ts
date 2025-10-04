import { envVars } from "../config/env";
import { IAuth } from "../modules/auth/auth.interface";

import { generateToken } from "./generateToken";


export const createUserToken = (user: IAuth)=>{
  
    const jsonPayload = {
        userId: user._id,
        email: user.email,
    
    }
    return generateToken(jsonPayload, envVars.JWT_SECRET as string, envVars.JWT_EXPIRED as string)
   
}