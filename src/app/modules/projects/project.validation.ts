import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .trim()
    .min(2, "Title must be at least 2 characters long"),


    

  projectLink: z
    .string()
    .url("Project link must be a valid URL")
    .optional()
    .or(z.literal("")), 

  liveSite: z
    .string()
    .url("Live site must be a valid URL")
    .optional()
    .or(z.literal("")), 

  description: z
    .string({
      message: "Description is required",
    })
    .min(10, "Description must be at least 10 characters long"),

  features: z
    .array(z.string().min(1, "Feature cannot be empty"))
    .nonempty("At least one feature is required"),

  techStacks: z
    .array(z.string().min(1, "Tech stack item cannot be empty"))
    .nonempty("At least one tech stack is required"),
});
