import { Request, Response, Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { Media } from "../media/media.model";
import { Message } from "../message/message.model";
import { Project } from "../projects/project.model";
import { Skill } from "../skills/skill.model";

const getStats = catchAsyncError(async (req: Request, res: Response) => {
    const [projects, featuredProjects, skills, media, messages, unreadMessages, recentMessages, recentProjects] =
        await Promise.all([
            Project.countDocuments(),
            Project.countDocuments({ featured: true }),
            Skill.countDocuments(),
            Media.countDocuments(),
            Message.countDocuments(),
            Message.countDocuments({ isRead: { $ne: true } }),
            Message.find().sort({ createdAt: -1 }).limit(5),
            Project.find().sort({ createdAt: -1 }).limit(4).select("title thumbnail createdAt"),
        ])

    res.status(200).json({
        success: true,
        message: "stats retrived successfully",
        data: {
            projects,
            featuredProjects,
            skills,
            media,
            messages,
            unreadMessages,
            recentMessages,
            recentProjects,
        },
    })
})

const router = Router()

router.get("/", checkAuth(), getStats)

export const statsRouter = router
