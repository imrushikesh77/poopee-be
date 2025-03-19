var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getToilets } from '../services/getToilet.service.js';
import { addToilet } from '../services/addToilet.service.js';
import { z } from "zod";
export function getToilet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const locationSchema = z.object({
                latitude: z.string().regex(/^-?\d+(\.\d+)?$/),
                longitude: z.string().regex(/^-?\d+(\.\d+)?$/)
            });
            const parsed = locationSchema.safeParse(req.query);
            if (!parsed.success) {
                res.status(400).json({ error: "Invalid latitude/longitude" });
                return;
            }
            let location = {
                latitude: parsed.data.latitude,
                longitude: parsed.data.longitude
            };
            let AllToilets = yield getToilets();
            // let filteredToilets = getNearestToilets(location, AllToilets);
            res.status(200).json({ "toilets": AllToilets });
            return;
        }
        catch (error) {
            res.status(500).json({ "erorr": "Error while fetching toilets" });
            return;
        }
    });
}
export function postToilet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newToilet = yield addToilet(req, res);
            res.status(200).json({ "toilet": newToilet });
        }
        catch (error) {
            res.status(500).json({ "error": "Error while adding toilet" });
        }
    });
}
export function addLike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json({ "message": "Like added" });
        }
        catch (error) {
            res.status(500).json({ "error": "Error while adding like" });
        }
    });
}
export function addDislike(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json({ "message": "Dislike added" });
        }
        catch (error) {
            res.status(500).json({ "error": "Error while adding dislike" });
        }
    });
}
