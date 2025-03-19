var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ToiletModel from "../models/toilet.model.js";
import { uploadImageToCloudinary } from "../utils/handleImages.js";
import { z } from "zod";
export function addToilet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
                return;
            }
            let inputToilet = parsed.data;
            // Check if images were uploaded
            let uploadedPhotoUrls = [];
            if (req.files && Array.isArray(req.files)) {
                for (const file of req.files) {
                    const imageUrl = yield uploadImageToCloudinary(file.path);
                    uploadedPhotoUrls.push(imageUrl);
                }
            }
            // Assign uploaded photo URLs to the input
            inputToilet.photos = uploadedPhotoUrls;
            const toilet = new ToiletModel(inputToilet);
            yield toilet.save();
            return toilet;
        }
        catch (error) {
            console.log("Error while adding toilet", error);
            throw new Error("Error while adding toilet");
        }
    });
}
