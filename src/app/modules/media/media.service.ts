import AppError from "../../ErrorHelpers/AppError"
import { cloudinaryUpload } from "../../config/cloudinary.config"
import { envVars } from "../../config/env"
import { Blog } from "../blogs/blog.model,"
import { Project } from "../projects/project.model"
import { Skill } from "../skills/skill.model"
import { IMedia, Media } from "./media.model"

const MEDIA_FOLDER = "portfolio"

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromCloudinary = (resource: any): IMedia => ({
    url: resource.secure_url,
    publicId: resource.public_id,
    name: resource.original_filename || String(resource.public_id).split("/").pop(),
    format: resource.format,
    bytes: resource.bytes,
    width: resource.width,
    height: resource.height,
    uploadedAt: resource.created_at ? new Date(resource.created_at) : new Date(),
})

// The browser uploads straight to Cloudinary with this signature, so large
// files never pass through the serverless function (which caps bodies at ~4.5MB).
const getUploadSignature = () => {
    const timestamp = Math.round(Date.now() / 1000)
    const signature = cloudinaryUpload.utils.api_sign_request(
        { timestamp, folder: MEDIA_FOLDER },
        envVars.CLOUDINARY_SECRET_KEY as string
    )

    return {
        timestamp,
        signature,
        folder: MEDIA_FOLDER,
        apiKey: envVars.CLOUDINARY_API_KEY,
        cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    }
}

// Called after a direct upload. The asset is looked up on Cloudinary so the
// stored record always describes something that really exists in this account.
const registerMedia = async (publicId: string, name?: string) => {
    let resource
    try {
        resource = await cloudinaryUpload.api.resource(publicId)
    } catch {
        throw new AppError(404, "uploaded image not found on cloudinary")
    }

    const doc = fromCloudinary(resource)
    if (name) doc.name = name

    return Media.findOneAndUpdate(
        { publicId: doc.publicId },
        { $set: doc },
        { new: true, upsert: true }
    )
}

const getAllMedia = async (query: Record<string, string>) => {
    const page = Math.max(Number(query.page) || 1, 1)
    const limit = Math.min(Math.max(Number(query.limit) || 24, 1), 100)

    const filter = query.search
        ? { name: { $regex: escapeRegex(query.search), $options: "i" } }
        : {}

    const [data, total] = await Promise.all([
        Media.find(filter).sort({ uploadedAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit),
        Media.countDocuments(filter),
    ])

    return {
        data,
        metaData: { page, limit, total, totalPage: Math.ceil(total / limit) },
    }
}

const countUsage = async (url: string) => {
    const [projects, blogs, skills] = await Promise.all([
        Project.countDocuments({ thumbnail: url }),
        Blog.countDocuments({
            $or: [{ thumbnail: url }, { content: { $regex: escapeRegex(url) } }],
        }),
        Skill.countDocuments({ thumbnail: url }),
    ])

    return projects + blogs + skills
}

const deleteMedia = async (id: string, force: boolean) => {
    const media = await Media.findById(id)

    if (!media) {
        throw new AppError(404, "image not found")
    }

    if (!force) {
        const usage = await countUsage(media.url)
        if (usage > 0) {
            throw new AppError(409, `image is used by ${usage} item${usage > 1 ? "s" : ""}`)
        }
    }

    await cloudinaryUpload.uploader.destroy(media.publicId)
    await media.deleteOne()

    return media
}

// Pulls every image already in the Cloudinary account into the library,
// so uploads made before this module existed show up too.
const syncFromCloudinary = async () => {
    let nextCursor: string | undefined
    let found = 0
    let added = 0

    do {
        const result = await cloudinaryUpload.api.resources({
            type: "upload",
            resource_type: "image",
            max_results: 500,
            next_cursor: nextCursor,
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const resources: any[] = result.resources || []
        found += resources.length

        if (resources.length) {
            const write = await Media.bulkWrite(
                resources.map((resource) => ({
                    updateOne: {
                        filter: { publicId: resource.public_id },
                        update: { $setOnInsert: fromCloudinary(resource) },
                        upsert: true,
                    },
                }))
            )
            added += write.upsertedCount
        }

        nextCursor = result.next_cursor
    } while (nextCursor)

    return { found, added }
}

export const mediaService = {
    getUploadSignature,
    registerMedia,
    getAllMedia,
    deleteMedia,
    syncFromCloudinary,
}
