import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  department: {
    type: String, 
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  allowances: {
    type: Number,
    required: true
  },
  deductions: {
    type: Number,
    required: true
  },
  payDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
