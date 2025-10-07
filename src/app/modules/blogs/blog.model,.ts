import { Schema, model } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema(
    {
      title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
      },
      slug: {
        type: String,
        
        unique: true,
        
      },
      thumbnail: {
        type: String,
        
      },
      content: {
        type: String,
        required: [true, "Content is required"],
      },
      tags: {
        type: [String],
        default: [],
      },
      category: {
        type: String,
        trim: true,
      },
      isPublished: {
        type: Boolean,
        default: true,
      },
      publishedAt: {
        type: Date,
        default: Date.now,
      },
      views: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  );
  

  blogSchema.pre("save", async function(next) {

    if(this.isModified("title")){

        const baseSlug = this.title.toLowerCase().split(" ").join("-")

        let slug = `${baseSlug}-blog`

        this.slug = slug
    }
    
    next()
  })


  blogSchema.pre("findOneAndUpdate", async function(next){

    const blog = this.getUpdate() as Partial<IBlog>

    if(blog.title){
        const baseSlug = blog.title.toLowerCase().split(" ").join("-")
        let slug = `${baseSlug}-blog`

    
        blog.slug = slug
    }

    this.setUpdate(blog)

    next()
  })


  export const Blog = model("Blog", blogSchema);