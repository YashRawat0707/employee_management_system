import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

const Department = mongoose.model("Department", departmentSchema);
export default Department;
