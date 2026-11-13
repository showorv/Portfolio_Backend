import { Schema, model } from "mongoose";

export interface IMedia {
    url: string
    publicId: string
    name?: string
    format?: string
    bytes?: number
    width?: number
    height?: number
    uploadedAt?: Date
}

const mediaSchema = new Schema<IMedia>(
    {
        url: { type: String, required: true },
        publicId: { type: String, required: true, unique: true },
        name: { type: String, trim: true },
        format: { type: String },
        bytes: { type: Number },
        width: { type: Number },
        height: { type: Number },
        uploadedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Media = model<IMedia>("Media", mediaSchema);
