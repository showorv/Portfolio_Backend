import { envVars } from "../config/env";


import bcryptjs from "bcryptjs"
import { User } from "../modules/auth/auth.model";
import { IAuth } from "../modules/auth/auth.interface";

export const superAdmin =async ()=>{
    try {
        
        const superAdminExist = await User.findOne({email: envVars.ADMIN_EMAIL })

        if(superAdminExist){
            console.log("admin already exist");
            return;
            
        }
        if(!superAdminExist){
            console.log("admin creating");
            
        }

        const hashedPassword =await bcryptjs.hash(envVars.ADMIN_PASSWORD as string, Number(envVars.HASH_SALT)) 

      

        const payload: IAuth = {
            name: "Admin",
            email: envVars.ADMIN_EMAIL as string,
            password: hashedPassword,
        }

        const superAdmin = await User.create(payload)
        console.log("super admin created");
        console.log(superAdmin);
        
        


    } catch (error) {
        console.log(error);
        
    }
}