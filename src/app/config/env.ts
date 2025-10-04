import dotenv from "dotenv"

dotenv.config()

export const envVars = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    NODE_DEV: process.env.NODE_DEV,

    FRONTEND_URL: process.env.FRONTEND_URL,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRED: process.env.JWT_EXPIRED,

    HASH_SALT:process.env.HASH_SALT,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY:process.env.CLOUDINARY_SECRET_KEY

}