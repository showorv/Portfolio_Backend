import {  z } from "zod";

export const createBlogSchema = z.object({
    title: z
      .string({ message: "Title is required" })
      .trim()
      .min(2, "Title must be at least 2 characters"),
  
      slug: z.string().optional(),

  
    content: z
      .string({ message: "Content is required" })
      .min(10, "Content must be at least 10 characters"),
  
      tags: z.preprocess((val) => {
        if (typeof val === "string") return val.split(",").map(t => t.trim());
        return val;
      }, z.array(z.string())).optional(),
  
    category: z.string().trim().optional(),
  
    isPublished: z.preprocess((val) => val === "true", z.boolean()).optional()
  
  });
  
  export const updateBlogSchema = createBlogSchema.partial();