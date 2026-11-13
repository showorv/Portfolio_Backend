import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .trim()
    .min(2, "Title must be at least 2 characters long"),


    

  thumbnail: z.string().optional(),

  // left undefined when absent so a partial update never flips the flag
  featured: z.preprocess(
    (val) => (val === undefined ? undefined : val === true || val === "true"),
    z.boolean().optional()
  ),

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

  // features: z
  //   .array(z.string().min(1, "Feature cannot be empty"))
  //   .nonempty("At least one feature is required"),
    features: z.preprocess((val) => {
      if (typeof val === "string") return val.split(",").map(t => t.trim()).filter(Boolean);
      return val;
    }, z.array(z.string()).optional()),

  // techStacks: z
  //   .array(z.string().min(1, "Tech stack item cannot be empty"))
  //   .nonempty("At least one tech stack is required"),

    techStacks: z.preprocess((val) => {
      if (typeof val === "string") return val.split(",").map(t => t.trim()).filter(Boolean);
      return val;
    }, z.array(z.string()).optional()),
});

export const updatedZodSchema = projectValidationSchema.partial()

export const reorderProjectSchema = z.object({
  ids: z.array(z.string().regex(/^[a-f\d]{24}$/i, "invalid project id")).min(1).max(500),
})
