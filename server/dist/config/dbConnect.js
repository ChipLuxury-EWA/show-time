import mongoose from "mongoose";
const connectToMongoDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${res.connection.host}`);
    }
    catch (error) { //TODO tompo implement ts type
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
export default connectToMongoDB;
