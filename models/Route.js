// models/Route.js
import { Schema, model, mongoose } from "mongoose";

const RoutePointSchema = new Schema({
  pointId: { type: String, ref: "Point", required: true },
  order: { type: Number, required: true },
});

const RouteSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  routePoints: [RoutePointSchema],
  center: { type: Array },
  estimatedDistance: { type: Number, default: 0 },
  isFav: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if the model is already registered
const Route = mongoose.models.Route || model("Route", RouteSchema);

export default Route;
