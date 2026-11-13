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
      featured: {
        type: Boolean,
        default: false,
      },
      // position in the list, lowest first. set by the admin's reorder action
      order: {
        type: Number,
        default: 0,
      },

}, {
    timestamps: true
})

export const Project = model("Project", projectSchema)