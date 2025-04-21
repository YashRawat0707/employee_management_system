import Salary from '../models/salaryModel.js';

// Create a new salary record
export const createSalary = async (req, res) => {
  try {
    const salary = new Salary(req.body);
    await salary.save();
    res.status(201).json(salary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all salary records
export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find()
      .populate('employee', 'name') // show employee name
      .populate('department', 'name'); // show department name
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get salary by employeeId
export const getSalaryByEmployee = async (req, res) => {
  try {
    const salary = await Salary.findOne({ employee: req.params.id })
      .populate('employee', 'name') // show employee name
      .populate('department', 'name'); // show department name
    
    if (!salary) {
      return res.status(404).json({ message: 'Salary not found for this employee' });
    }

    res.json(salary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
