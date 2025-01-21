// import mongoose from "mongoose";
// import Point from "../models/Point.js";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import path from "path";

// // Set up __dirname equivalent for ES modules
// // Loading environment variables for backend
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// dotenv.config({ path: path.join(__dirname, "../.env") });

// const points = [
//   {
//     id: "point1",
//     title: "Dinxperlo Church",
//     description: "A kerk van 19ste eeuw.",
//     type: "landmark",
//     coordinates: { latitude: 51.860764, longitude: 6.485223 },
//   },
//   {
//     id: "point2",
//     title: "Dinxperlo Bazaar",
//     description: "A scenic point along the route.",
//     type: "normal",
//     coordinates: { latitude: 51.862542, longitude: 6.489167 },
//   },
//   {
//     id: "point3",
//     title: "Dinxperlo School",
//     description: "Tell 20 Dinxperloer how wonderful they are.",
//     type: "task",
//     coordinates: { latitude: 51.864324, longitude: 6.488324 },
//   },
//   {
//     id: "point4",
//     title: "Ulft Church",
//     description: "A kerk van 19ste eeuw.",
//     type: "landmark",
//     coordinates: { latitude: 51.891234, longitude: 6.375132 },
//   },
//   {
//     id: "point5",
//     title: "Ulft Bazaar",
//     description: "A scenic point along the route.",
//     type: "normal",
//     coordinates: { latitude: 51.892543, longitude: 6.380234 },
//   },
//   {
//     id: "point6",
//     title: "Ulft School",
//     description: "Tell 20 Dinxperloer how wonderful they are.",
//     type: "task",
//     coordinates: { latitude: 51.887653, longitude: 6.379234 },
//   },
//   {
//     id: "point7",
//     title: "Aalten Church",
//     description: "A kerk van 19ste eeuw.",
//     type: "landmark",
//     coordinates: { latitude: 51.924522, longitude: 6.578121 },
//   },
//   {
//     id: "point8",
//     title: "Aalten Bazaar",
//     description: "A scenic point along the route.",
//     type: "normal",
//     coordinates: { latitude: 51.928124, longitude: 6.583452 },
//   },
//   {
//     id: "point9",
//     title: "Aalten School",
//     description: "Tell 20 Dinxperloer how wonderful they are.",
//     type: "task",
//     coordinates: { latitude: 51.930212, longitude: 6.577893 },
//   },
// ];

// async function addPoints() {
//   await mongoose.connect(process.env.MONGO_KEY);

//   try {
//     await Point.insertMany(points);
//     console.log("Points added successfully!");
//   } catch (error) {
//     console.error("Error adding points:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// addPoints();
