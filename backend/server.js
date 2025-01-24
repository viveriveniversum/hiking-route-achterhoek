import express from "express";
import mongoose from "mongoose";
import Route from "../models/Route.js";
import Point from "../models/Point.js";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// env variables for backend. to use process.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_KEY)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/routes", async (req, res) => {
  try {
    const routes = await Route.find().lean();
    console.log("Routes found:", routes.length);
    res.json(routes);
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ error: "Failed to fetch routes" });
  }
});

app.get("/api/points", async (req, res) => {
  try {
    const points = await Point.find().lean();
    console.log("Points found:", points.length);
    res.json(points);
  } catch (error) {
    console.error("Error fetching points:", error);
    res.status(500).json({ error: "Failed to fetch points" });
  }
});
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.url} not found` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
