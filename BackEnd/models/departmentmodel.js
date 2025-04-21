import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt


import Employee from "./Employee.js";
import Leave from "./leaveModel.js";
import Salary from "./salaryModel.js";

departmentSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  try {
    const departmentId = this._id;
    const employees = await Employee.find({ department: departmentId });
    const empIds = employees.map(emp => emp._id);
    await Employee.deleteMany({ department: departmentId });
    await Leave.deleteMany({ employeeId: { $in: empIds } });
    await Salary.deleteMany({ employeeId: { $in: empIds } });
    next();
  } catch(err) {
    next(err);
  }
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
