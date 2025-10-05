import {  z } from "zod";

export const createSkillSchema = z.object({
    name: z
      .string({ message: "Title is required" })
      .trim()
      .min(2, "Title must be at least 2 characters").optional(),

  
    category: z.string().trim().optional(),
  

  
  });
