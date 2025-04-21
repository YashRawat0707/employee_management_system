// // import express from 'express';
// // import { login, verify } from '../controllers/authController.js';
// // import {protect } from '../middleware/authMiddleware.js';


// // const router = express.Router()

// // router.post('/login', login);
// // router.get('/verify', protect, verify);

// // export default router;


// import express from 'express';
// import { login, verify, register } from '../controllers/authController.js'; // Add register import
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Existing routes
// router.post('/login', login);
// router.get('/verify', protect, verify);

// // Add a new route for registration
// router.post('/register', register); // New registration route

// export default router;


import express from 'express';
import {
  login,
  verify,
  register,
  sendOtp,
  resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', protect, verify);
router.post('/register', register);

// ✅ Add these two new routes:
router.post('/send-otp', sendOtp);
router.post('/reset-password', resetPassword);

export default router;
