const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:5173",
            "http://127.0.0.1:5173",],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Event Schedule Management API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("========================================");
    console.log("🚀 Event Management Backend Started");
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log("========================================");
});
