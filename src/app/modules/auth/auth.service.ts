import AppError from "../../ErrorHelpers/AppError"
import { createUserToken } from "../../utils/createUserToken"
import { IAuth } from "./auth.interface"
import { User } from "./auth.model"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env"

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

const changePassword = async (email: string, currentPassword: unknown, newPassword: unknown)=>{

    if(typeof currentPassword !== "string" || typeof newPassword !== "string"){
        throw new AppError(400, "current and new password are required")
    }

    if(newPassword.length < 8){
        throw new AppError(400, "new password must be at least 8 characters")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(404, "user not found")
    }

    const isPasswordMatch = await bcryptjs.compare(currentPassword, user.password as string)

    if(!isPasswordMatch){
        throw new AppError(400, "current password is incorrect")
    }

    user.password = await bcryptjs.hash(newPassword, Number(envVars.HASH_SALT) || 10)
    await user.save()
}

export const authService = {login, getMe, changePassword}