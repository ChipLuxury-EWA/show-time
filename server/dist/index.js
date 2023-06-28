import dotenv from "dotenv";
import connectToMongoDB from "./config/dbConnect.js";
import app from "./app.js";
dotenv.config();
const port = process.env.PORT || 3001;
connectToMongoDB();
app.listen(port, () => console.log(`Server is running on port ${port}`));
