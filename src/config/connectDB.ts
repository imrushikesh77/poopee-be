import mongoose from "mongoose";

async function connect() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI not found");
        }
        const connection = await mongoose.connect(uri);
        if (connection) {
            console.log("Connected to database");
        } else {
            throw new Error("Failed to connect to database");
        }
    } catch (err) {
        console.error(err);
        throw new Error("Failed to connect to database: " + err);
    }
}

export default connect;