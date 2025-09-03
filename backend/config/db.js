const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            bufferMaxEntries: 0,
            bufferCommands: false,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        console.error("Connection string:", process.env.MONGO_URI);
        // Don't exit the process, let the server continue running
        // process.exit(1);
    }
};

module.exports = connectDB;