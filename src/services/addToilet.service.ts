import { Request, Response } from "express";
import ToiletModel from "../models/toilet.model.js";
import { uploadImageToCloudinary } from "../utils/handleImages.js";
import { z } from "zod";

export async function addToilet(req: Request, res: Response) {
    try {
        const toiletSchema = z.object({
            location: z.object({
                latitude: z.string(),
                longitude: z.string()
            }),
            landmark: z.string(),
            usedFor: z.enum(["Peeing", "Pooping", "Both"]),
            photos: z.array(z.string()).optional()
        });

        const parsed = toiletSchema.safeParse({
            location: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            landmark: req.body.landmark,
            usedFor: req.body.usedFor
        });

        if (!parsed.success) {
            console.log("Invalid request body", parsed.error);
            res.status(400).json({ error: "Invalid request body" });
            return
        }
        let inputToilet = parsed.data;

        // Check if images were uploaded
        let uploadedPhotoUrls: string[] = [];
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const imageUrl = await uploadImageToCloudinary((file as Express.Multer.File).path);
                uploadedPhotoUrls.push(imageUrl);
            }
        }

        // Assign uploaded photo URLs to the input
        inputToilet.photos = uploadedPhotoUrls;

        const toilet = new ToiletModel(inputToilet);
        await toilet.save();
        return toilet;
    } catch (error) {
        console.log("Error while adding toilet", error);
        throw new Error("Error while adding toilet");
    }
}