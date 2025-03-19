import mongoose, { Schema } from "mongoose";
// Enum for Toilet Usage
export var ToiletUsage;
(function (ToiletUsage) {
    ToiletUsage["PEEING"] = "Peeing";
    ToiletUsage["POOPING"] = "Pooping";
    ToiletUsage["BOTH"] = "Both";
})(ToiletUsage || (ToiletUsage = {}));
//Location Schema(Subschema) 
export const LocationSchema = new Schema({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
});
// Schema for Toilet
const ToiletSchema = new Schema({
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    location: { type: LocationSchema, required: true },
    landmark: { type: String, required: true },
    usedFor: { type: String, enum: Object.values(ToiletUsage), required: true, default: ToiletUsage.BOTH },
    photos: {
        type: [String],
        default: [],
    }
}, { timestamps: true });
const ToiletModel = mongoose.model("Toilet", ToiletSchema);
export default ToiletModel;
