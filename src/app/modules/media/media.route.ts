import { Request, Response, Router } from "express";
import { z } from "zod";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateSchma } from "../../middlewares/validationSchema";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { mediaService } from "./media.service";

const registerMediaSchema = z.object({
    publicId: z.string().min(1, "publicId is required"),
    name: z.string().trim().optional(),
})

const getSignature = catchAsyncError(async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "upload signature created",
        data: mediaService.getUploadSignature(),
    })
})

const registerMedia = catchAsyncError(async (req: Request, res: Response) => {
    const media = await mediaService.registerMedia(req.body.publicId, req.body.name)

    res.status(200).json({
        success: true,
        message: "image added to library",
        data: media,
    })
})

const getAllMedia = catchAsyncError(async (req: Request, res: Response) => {
    const media = await mediaService.getAllMedia(req.query as Record<string, string>)

    res.status(200).json({
        success: true,
        message: "media retrived successfully",
        data: media.data,
        metaData: media.metaData,
    })
})

const deleteMedia = catchAsyncError(async (req: Request, res: Response) => {
    const media = await mediaService.deleteMedia(req.params.id, req.query.force === "true")

    res.status(200).json({
        success: true,
        message: "image deleted successfully",
        data: media,
    })
})

const syncMedia = catchAsyncError(async (req: Request, res: Response) => {
    const result = await mediaService.syncFromCloudinary()

    res.status(200).json({
        success: true,
        message: `${result.added} new image${result.added === 1 ? "" : "s"} imported`,
        data: result,
    })
})

const router = Router()

router.use(checkAuth())

router.get("/", getAllMedia)
router.post("/sign", getSignature)
router.post("/register", validateSchma(registerMediaSchema), registerMedia)
router.post("/sync", syncMedia)
router.delete("/:id", deleteMedia)

export const mediaRouter = router
