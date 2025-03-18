import ToiletModel, { IToilet } from "../models/toilet.model.js";

export async function addLikeToToilet(toiletId: string): Promise<IToilet> {
    try {
        const toilet = await ToiletModel.findById(toiletId);
        if (!toilet) {
            throw new Error("Toilet not found");
        }
        toilet.likes += 1;
        await toilet.save();
        return toilet;
    } catch (error) {
        throw new Error("Error while adding like to toilet");
    }
}

export async function addDislike(toiletId: string): Promise<IToilet> {
    try {
        const toilet = await ToiletModel.findById(toiletId);
        if (!toilet) {
            throw new Error("Toilet not found");
        }
        toilet.dislikes += 1;
        await toilet.save();
        return toilet;
    } catch (error) {
        throw new Error("Error while adding dislike to toilet");
    }
}