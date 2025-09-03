const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");
const authRoutes = require("../routes/authRoutes");
const incomeRoutes = require("../routes/incomeRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");

const app = express();

//middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// Connect to database
console.log("Starting database connection...");
connectDB();

// Health check route
app.get("/", (req, res) => {
    res.json({ 
        message: "Finance Tracker API is running!", 
        status: "success",
        timestamp: new Date().toISOString()
    });
});

// Database connection test route
app.get("/test-db", async (req, res) => {
    try {
        const mongoose = require("mongoose");
        const connectionState = mongoose.connection.readyState;
        const states = {
            0: "disconnected",
            1: "connected", 
            2: "connecting",
            3: "disconnecting"
        };
        
        res.json({
            message: "Database connection test",
            connectionState: states[connectionState],
            mongoUri: process.env.MONGO_URI ? "Set" : "Not set",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.json({
            message: "Database connection test failed",
            error: error.message,
            mongoUri: process.env.MONGO_URI ? "Set" : "Not set"
        });
    }
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error', 
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
