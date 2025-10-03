import { Schema, model } from "mongoose";
import { IAuth } from "./auth.interface";


const userSchema = new Schema<IAuth>({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})


export const User = model<IAuth>("User", userSchema)

