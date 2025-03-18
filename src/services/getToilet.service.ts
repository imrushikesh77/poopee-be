import ToiletModel from "../models/toilet.model.js";

export async function getToilets() {
    try {
        const toilets = await ToiletModel.find();
        return toilets;
    } catch (error) {
        throw new Error("Error while fetching toilets");
    }
}