import { ILocation, IToilet } from "../models/toilet.model.js";

export async function getNearestToilets(location: ILocation, toilets: IToilet[]) {
    let nearestToilets: IToilet[] = [];
    let minDistance = Number.MAX_VALUE;
    for (let i = 0; i < toilets.length; i++) {
        const toilet = toilets[i];
        const distance = Math.sqrt(Math.pow(toilet.location.latitude - location.latitude, 2) + Math.pow(toilet.location.longitude - location.longitude, 2));
        if (distance < minDistance) {
            minDistance = distance;
            nearestToilets = [toilet];
        } else if (distance == minDistance) {
            nearestToilets.push(toilet);
        }
    }
    return nearestToilets;
}