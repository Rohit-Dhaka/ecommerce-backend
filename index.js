import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import router from "./routes/index.js";

// Load environment variables
dotenv.config();

const app = express();

// PORT is NOT imported. You read it directly:
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", router);

// Connect Database
ConnectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
