import app from "./index.js";
import dotenv from "dotenv";
dotenv.config();
// Import connection to database
import connect from "./config/connectDB.js";
const port = process.env.PORT || 3000;
// Connect to database
connect()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((err) => {
    console.error(err);
});
