// import mongoose from "mongoose";
// import Route from "../models/Route.js";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import path from "path";

// // Set up __dirname equivalent for ES modules
// // Loading environment variables for backend
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// dotenv.config({ path: path.join(__dirname, "../.env") });

// const routes = [
//   {
//     id: "route1",
//     name: "Dinxperlo Route",
//     description: "A scenic hiking route in Dinxperlo.",
//     routePoints: [
//       { pointId: "point1", order: 1 },
//       { pointId: "point2", order: 2 },
//       { pointId: "point3", order: 3 },
//     ],
//     estimatedDistance: 5.0,
//     center: [51.861217, 6.486893],
//     isFav: true,
//   },
//   {
//     id: "route2",
//     name: "Ulft Route",
//     description: "A scenic hiking route in Ulft.",
//     routePoints: [
//       { pointId: "point4", order: 1 },
//       { pointId: "point5", order: 2 },
//       { pointId: "point6", order: 3 },
//     ],
//     estimatedDistance: 5.0,
//     center: [51.890223, 6.376982],
//   },
//   {
//     id: "route3",
//     name: "Aalten Route",
//     description: "A scenic hiking route in Aalten.",
//     routePoints: [
//       { pointId: "point7", order: 1 },
//       { pointId: "point8", order: 2 },
//       { pointId: "point9", order: 3 },
//     ],
//     estimatedDistance: 5.0,
//     center: [51.926235, 6.580284],
//   },
// ];

// async function addRoutes() {
//   await mongoose.connect(process.env.MONGO_KEY);
//   try {
//     await Route.insertMany(routes);
//     console.log("Routes added successfully!");
//   } catch (error) {
//     console.error("Error adding routes:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// addRoutes();
