import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  comments: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Performance", performanceSchema);
