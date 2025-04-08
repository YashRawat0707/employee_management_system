import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
