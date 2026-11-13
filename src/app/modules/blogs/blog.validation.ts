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
  
      thumbnail: z.string().optional(),

      tags: z.preprocess((val) => {
        if (typeof val === "string") return val.split(",").map(t => t.trim()).filter(Boolean);
        return val;
      }, z.array(z.string()).optional()),
  
    category: z.string().trim().optional(),
  
    // left undefined when absent so a partial update never flips the flag
    isPublished: z.preprocess(
      (val) => (val === undefined ? undefined : val === true || val === "true"),
      z.boolean().optional()
    )
  
  });
  
  export const updateBlogSchema = createBlogSchema.partial();