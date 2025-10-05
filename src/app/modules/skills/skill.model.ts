import { Schema, model } from "mongoose";


export interface ISkill {
    name?: string
    thumbnail:string
    category:string
}

const skillSchema = new Schema(
    {
      name: {
        type: String,
       
      },
     
    
      thumbnail: {
        type: String,
        
      },
     
   
      category: {
        type: String,
        trim: true,
      }
  
    },
    { timestamps: true }
  );
  



  export const Skill = model("Skill", skillSchema);