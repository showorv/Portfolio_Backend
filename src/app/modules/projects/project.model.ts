import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";



const projectSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
      },
      thumbnail: {
        type: String,
       
      },
      projectLink: {
        type: String,
        
      },
      liveSite: {
        type: String,
       
      },
      description: {
        type: String,
        required: true,
       
      },
      features: {
        type: [String],
        required: true,
      },
      techStacks: {
        type: [String],
        required: true,
      },

}, {
    timestamps: true
})

export const Project = model("Project", projectSchema)