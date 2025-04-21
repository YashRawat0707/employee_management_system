import express from 'express';
import { createSalary, getAllSalaries, getSalaryByEmployee } from '../controllers/salaryController.js';

const router = express.Router();

router.post('/', createSalary);
router.get('/', getAllSalaries);

// New route to fetch salary details by employeeId
router.get('/employee/:id', getSalaryByEmployee);

export default router; // ✅ important for ES modules
