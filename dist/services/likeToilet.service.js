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
export function addLikeToToilet(toiletId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const toilet = yield ToiletModel.findById(toiletId);
            if (!toilet) {
                throw new Error("Toilet not found");
            }
            toilet.likes += 1;
            yield toilet.save();
            return toilet;
        }
        catch (error) {
            throw new Error("Error while adding like to toilet");
        }
    });
}
export function addDislike(toiletId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const toilet = yield ToiletModel.findById(toiletId);
            if (!toilet) {
                throw new Error("Toilet not found");
            }
            toilet.dislikes += 1;
            yield toilet.save();
            return toilet;
        }
        catch (error) {
            throw new Error("Error while adding dislike to toilet");
        }
    });
}
