import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

let isCloudinaryConfigured = false;  // Track if Cloudinary is already configured

// Now connecting to Cloudinary
export const cloudinaryConnect = () => {
    if (isCloudinaryConfigured) {
        console.log("Using existing Cloudinary configuration");
        return;
    }

    if (!process.env.cloud_name || !process.env.api_key || !process.env.api_secret) {
        throw new Error("Cloudinary environment variables are not set");
    }

    try {
        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        });
        isCloudinaryConfigured = true;  // Mark Cloudinary as configured
        console.log("Cloudinary connection done");
    } catch (err) {
        console.error("Error in cloudinaryConnect:", err.message);
        throw new Error("Cloudinary configuration failed");
    }
};

