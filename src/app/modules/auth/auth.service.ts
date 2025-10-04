import AppError from "../../ErrorHelpers/AppError"
import { createUserToken } from "../../utils/createUserToken"
import { IAuth } from "./auth.interface"
import { User } from "./auth.model"
import bcryptjs from "bcryptjs"

const login = async (payload: IAuth)=>{

    const {email,password} = payload

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(401, "Email is incorrect")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, user.password as string)

    
    if(!isPasswordMatch){
        throw new AppError(401, "password is incorrect")
    }

    const accessUserToken =createUserToken(user)
    const {password: pass, ...rest} = user.toObject()

    return {
        accessUserToken,
        user: rest
    }


}


const getMe = async(userId: string)=>{

    const user = await User.findById(userId).select("-password")

    return user;



   
}

export const authService = {login, getMe}