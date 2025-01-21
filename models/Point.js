import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  type: {
    type: String,
    enum: ["normal", "task", "landmark"],
    default: "normal",
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Point = mongoose.model("Point", PointSchema);
export default Point;
