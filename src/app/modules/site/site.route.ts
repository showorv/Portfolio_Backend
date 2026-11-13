import { Request, Response, Router } from "express";
import { z } from "zod";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { Site } from "./site.model";

const str = z.string().trim().max(5000).default("")
const list = z.array(z.string().trim().min(1).max(2000)).max(50).default([])

const siteSchema = z.object({
    hero: z.object({
        name: str,
        roles: list,
        badge: str,
        intro: str,
        image: str,
        experience: str,
        resumeUrl: str,
    }),
    about: z.object({
        subtitle: str,
        image: str,
        paragraphs: list,
        traits: list,
    }),
    education: z.array(z.object({ year: str, title: str, institute: str, details: list })).max(30),
    certificates: z.array(z.object({ title: str, org: str, year: str, link: str })).max(50),
    contact: z.object({
        email: str,
        phone: str,
        github: str,
        linkedin: str,
    }),
})

// public: the landing page reads this. data is null until content is first saved.
const getSite = catchAsyncError(async (req: Request, res: Response) => {
    const site = await Site.findOne({ key: "main" }).select("-_id -key -__v -createdAt")

    res.status(200).json({
        success: true,
        message: "site content retrived successfully",
        data: site,
    })
})

const updateSite = catchAsyncError(async (req: Request, res: Response) => {
    const site = await Site.findOneAndUpdate(
        { key: "main" },
        { $set: req.body },
        { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).select("-_id -key -__v -createdAt")

    res.status(200).json({
        success: true,
        message: "site content saved",
        data: site,
    })
})

const router = Router()

router.get("/", getSite)
router.put("/", checkAuth(), validateSchma(siteSchema), updateSite)

export const siteRouter = router
