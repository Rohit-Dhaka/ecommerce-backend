import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
ConnectDB();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
