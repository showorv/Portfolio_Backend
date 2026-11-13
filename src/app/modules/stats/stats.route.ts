import { Request, Response, Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { Blog } from "../blogs/blog.model,";
import { Media } from "../media/media.model";
import { Message } from "../message/message.model";
import { Project } from "../projects/project.model";
import { Skill } from "../skills/skill.model";

const getStats = catchAsyncError(async (req: Request, res: Response) => {
    const [projects, blogs, skills, media, messages, unreadMessages, views, recentMessages, recentProjects] =
        await Promise.all([
            Project.countDocuments(),
            Blog.countDocuments(),
            Skill.countDocuments(),
            Media.countDocuments(),
            Message.countDocuments(),
            Message.countDocuments({ isRead: { $ne: true } }),
            Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
            Message.find().sort({ createdAt: -1 }).limit(5),
            Project.find().sort({ createdAt: -1 }).limit(4).select("title thumbnail createdAt"),
        ])

    res.status(200).json({
        success: true,
        message: "stats retrived successfully",
        data: {
            projects,
            blogs,
            skills,
            media,
            messages,
            unreadMessages,
            blogViews: views[0]?.total || 0,
            recentMessages,
            recentProjects,
        },
    })
})

const router = Router()

router.get("/", checkAuth(), getStats)

export const statsRouter = router
