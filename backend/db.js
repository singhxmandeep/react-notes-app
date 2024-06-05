const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfullyy");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        // Optionally, you might want to rethrow the error to let the caller handle it
        throw error;
    }
};

module.exports = connectToMongo;
