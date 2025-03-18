import { Request, Response } from 'express';
import { getToilets } from '../services/getToilet.service.js'
import { addToilet } from '../services/addToilet.service.js'
import { getNearestToilets } from '../utils/getNearestToilets.util.js'
import { ILocation } from '../models/toilet.model.js';
import { z } from "zod";

export async function getToilet(req: Request, res: Response): Promise<void> {
    try {
        const locationSchema = z.object({
            latitude: z.string().regex(/^-?\d+(\.\d+)?$/),
            longitude: z.string().regex(/^-?\d+(\.\d+)?$/)
        });
        const parsed = locationSchema.safeParse(req.query);
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid latitude/longitude" });
            return
        }

        let location = {
            latitude: parsed.data.latitude,
            longitude: parsed.data.longitude
        } as ILocation;
        let AllToilets = await getToilets();
        // let filteredToilets = getNearestToilets(location, AllToilets);
        res.status(200).json({ "toilets": AllToilets });
        return
    } catch (error) {
        res.status(500).json({ "erorr": "Error while fetching toilets" });
        return
    }
}

export async function postToilet(req: Request, res: Response): Promise<void> {
    try {
        let newToilet = await addToilet(req, res);
        res.status(200).json({ "toilet": newToilet });
    } catch (error) {
        res.status(500).json({ "error": "Error while adding toilet" });
    }
}

export async function addLike(req: Request, res: Response): Promise<void> {
    try {
        res.status(200).json({ "message": "Like added" });
    } catch (error) {
        res.status(500).json({ "error": "Error while adding like" });
    }
}

export async function addDislike(req: Request, res: Response): Promise<void> {
    try {
        res.status(200).json({ "message": "Dislike added" });
    } catch (error) {
        res.status(500).json({ "error": "Error while adding dislike" });
    }
}
