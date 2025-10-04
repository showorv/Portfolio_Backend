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
  
    tags: z.array(z.string()).optional(),
  
    category: z.string().trim().optional(),
  
    isPublished: z.boolean().optional()
  
  });
  
  export const updateBlogSchema = createBlogSchema.partial();