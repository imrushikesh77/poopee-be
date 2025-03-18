import mongoose, { Schema, Document } from "mongoose";

// Interface for Location
export interface ILocation {
    latitude: string;
    longitude: string;
}

// Enum for Toilet Usage
export enum ToiletUsage {
    PEEING = "Peeing",
    POOPING = "Pooping",
    BOTH = "Both"
}


// Interface for Toilet
export interface IToilet extends Document {
    likes: number;
    dislikes: number;
    location: ILocation
    landmark: string;
    usedFor: ToiletUsage;
    photos: string[];
}

//Location Schema(Subschema) 
export const LocationSchema = new Schema<ILocation>({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
});

// Schema for Toilet
const ToiletSchema = new Schema<IToilet>({
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

const ToiletModel = mongoose.model<IToilet>("Toilet", ToiletSchema);



export default ToiletModel;