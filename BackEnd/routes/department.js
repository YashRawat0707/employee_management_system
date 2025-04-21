import express from 'express';
import {  addDepartment,
      getDepartments,
      getDepartmentById,
      updateDepartment,
      deleteDepartment } from '../controllers/departmentController.js';
import {protect} from '../middleware/authMiddleware.js'; // ✅ Uncommented


const router = express.Router();

router.get('/',getDepartments);
router.post('/add', addDepartment); // Add it back when you're ready
router.get('/:id',getDepartmentById);
router.put('/:id',updateDepartment);
router.delete('/:id',deleteDepartment)

export default router;
