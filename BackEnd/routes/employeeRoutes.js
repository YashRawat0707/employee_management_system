import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// POST /api/employees - Add employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const saved = await newEmployee.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving employee:", err);
    res.status(500).json({ error: "Error adding employee" });
  }
});

// GET /api/employees - Get all employees
router.get("/", async (req, res) => {
  try {
    const all = await Employee.find();
    res.status(200).json(all);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// ✅ GET /api/employees/:id - Get single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: "Error fetching employee" });
  }
});

// ✅ PUT /api/employees/:id - Update employee by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Error updating employee" });
  }
});

export default router;
