// routes/dashboard.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Named import
import { getSummary } from '../controllers/dashboardController.js';

const router = express.Router();

// Applying protect middleware
router.get('/summary', protect , getSummary, (req, res) => {
  res.json({ message: 'Summary Data' });
});


// router.get('/summary', protect, getSummary);

export default router;
