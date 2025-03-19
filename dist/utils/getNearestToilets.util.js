var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getNearestToilets(location, toilets) {
    return __awaiter(this, void 0, void 0, function* () {
        let nearestToilets = [];
        let minDistance = Number.MAX_VALUE;
        for (let i = 0; i < toilets.length; i++) {
            const toilet = toilets[i];
            const distance = Math.sqrt(Math.pow(parseInt(toilet.location.latitude) - parseInt(location.latitude), 2) + Math.pow(parseInt(toilet.location.longitude) - parseInt(location.longitude), 2));
            if (distance < minDistance) {
                minDistance = distance;
                nearestToilets = [toilet];
            }
            else if (distance == minDistance) {
                nearestToilets.push(toilet);
            }
        }
        return nearestToilets;
    });
}
