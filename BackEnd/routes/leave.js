// import express from 'express';
// import { getLeaves, getLeaveDetail, updateLeaveStatus } from '../controllers/leaveController.js';
// import { protect, authorize } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', protect, authorize('admin', 'employee'), getLeaves);
// router.get('/detail/:id', protect, authorize('admin', 'employee'), getLeaveDetail);
// router.put('/:id', protect, authorize('admin'), updateLeaveStatus);

// export default router;


// routes/leave.js
import express from 'express';
import {
  getLeaves,
  getLeaveDetail,
  updateLeaveStatus
} from '../controllers/leaveController.js';

import {
  protect,
  authorize
} from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all leaves (admin & employee)
router.get('/', protect, authorize('admin', 'employee'), getLeaves);

// Route to get leave detail by ID (admin & employee)
router.get('/detail/:id', protect, authorize('admin', 'employee'), getLeaveDetail);

// Route to update leave status (admin only)
router.put('/:id', protect, authorize('admin'), updateLeaveStatus);

export default router;
