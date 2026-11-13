import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError";

import { authService } from "./auth.service";
import { setCookies } from "../../utils/cookieSet";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


const login = catchAsyncError(async(req: Request, res: Response)=>{

    const loginInfo = await authService.login(req.body)

    setCookies(res,{ accessToken: loginInfo.accessUserToken })

   res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            accessToken: loginInfo.accessUserToken,
            user: loginInfo.user
        }
    })

})

const logout = catchAsyncError(async(req: Request, res: Response)=>{

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })



    res.status(200).json({
        success: true,
        message: "User logged out",
        data: null
    })
    
})

const getMe = catchAsyncError(async(req: Request,res: Response)=>{

    const decodedToken = req.user as JwtPayload

    const user = await authService.getMe(decodedToken.userId);
    

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "your profile retrived successfully",
        data: user,
       
    })
})


const changePassword = catchAsyncError(async(req: Request,res: Response)=>{

    const decodedToken = req.user as JwtPayload

    await authService.changePassword(decodedToken.email, req.body?.currentPassword, req.body?.newPassword)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "password changed successfully",
        data: null,
    })
})


export const authController = {login, logout, getMe, changePassword}