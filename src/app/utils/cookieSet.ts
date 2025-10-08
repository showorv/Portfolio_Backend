import { Response } from "express";



interface AuthToken {
    accessToken?: string;

}

export const setCookies = (res: Response, tokenInfo: AuthToken)=>{

    if(tokenInfo.accessToken){
        res.cookie("access-token", tokenInfo.accessToken, {
            // httpOnly: true,
            // secure: true,
            // sameSite: "none"
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // only true in prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        })
    }

    // if(tokenInfo.refreshToken){
    //     res.cookie("refreshToken", tokenInfo.refreshToken, {
    //         httpOnly: true, // eta na dile frontend e cookie set hbe na
    //         // secure: false // eta na dile frontend e cookie access korte dibe na cors er karone
    //         // secure: envVars.NODE_ENV !== "development",
    //         secure: true,
    //         sameSite: "none"
    //     })
    // }
}