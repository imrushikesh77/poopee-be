import cloudinary from "../config/configCloudinary.js";
import fs from "fs/promises";

export async function uploadImageToCloudinary(file: string): Promise<string> {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "poopee"
        });
        await fs.unlink(file);
        return result.secure_url;
    } catch (err) {
        console.error(err);
        // Ensure that the file is deleted even if upload fails
        try {
            await fs.unlink(file);
            console.log(`Deleted local file (after failure): ${file}`);
        } catch (deleteErr) {
            console.error("Error deleting local file:", deleteErr);
        }
        throw new Error("Failed to upload image: " + err);
    }
}