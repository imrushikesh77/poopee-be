var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cloudinary from "../config/configCloudinary.js";
import fs from "fs/promises";
export function uploadImageToCloudinary(file) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield cloudinary.uploader.upload(file, {
                folder: "poopee"
            });
            yield fs.unlink(file);
            return result.secure_url;
        }
        catch (err) {
            console.error(err);
            // Ensure that the file is deleted even if upload fails
            try {
                yield fs.unlink(file);
                console.log(`Deleted local file (after failure): ${file}`);
            }
            catch (deleteErr) {
                console.error("Error deleting local file:", deleteErr);
            }
            throw new Error("Failed to upload image: " + err);
        }
    });
}
