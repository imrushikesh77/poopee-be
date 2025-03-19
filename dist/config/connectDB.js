var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uri = process.env.MONGO_URI;
            if (!uri) {
                throw new Error("MONGO_URI not found");
            }
            const connection = yield mongoose.connect(uri);
            if (connection) {
                console.log("Connected to database");
            }
            else {
                throw new Error("Failed to connect to database");
            }
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to connect to database: " + err);
        }
    });
}
export default connect;
