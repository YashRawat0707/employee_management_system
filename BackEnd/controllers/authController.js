// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, error: "User Not Found" });
//         }

//         // Check if password is correct
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, error: "Wrong Password" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { _id: user._id, role: user.role },
//             process.env.JWT_KEY,
//             { expiresIn: "10d" }
//         );

//         // Send response with token and user details
//         return res.status(200).json({
//             success: true,
//             token,
//             user: { _id: user._id, name: user.name, role: user.role },
//         });

//     } catch (error) {
//         console.error("Login Error:", error.message);
//         return res.status(500).json({ success: false, error: "Server Error" });
//     }
// };

// const verify = (req, res) => {
//     return res.status(200).json({success:true, user: req.user});
// }
// // 
// let otpStore = {}; // In-memory, can be replaced with Redis

// export const register = async (req, res) => {
//     const { name, email, password, role = 'employee' } = req.body; // Set default role to 'employee'
  
//     // Check if the user already exists
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });
  
//     // Hash the password
//     const hashed = await bcrypt.hash(password, 10);
  
//     // Create a new user with default role
//     const user = new User({ name, email, password: hashed, role });
  
//     // Save the user to the database
//     await user.save();
//     res.status(201).json({ success: true, message: 'User registered successfully' });
//   };
  

// export const sendOtp = async (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   otpStore[email] = otp;
//   console.log(`OTP for ${email}: ${otp}`); // Replace with SMS service like Twilio
//   res.json({ success: true, message: 'OTP sent to registered phone (mocked)' });
// };

// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   if (otpStore[email] !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });
//   const hashed = await bcrypt.hash(newPassword, 10);
//   await User.findOneAndUpdate({ email }, { password: hashed });
//   delete otpStore[email];
//   res.json({ success: true, message: 'Password updated successfully' });
// };


// export { login, verify };

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Wrong Password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

let otpStore = {}; // In-memory storage

export const register = async (req, res) => {
  const { name, email, password, role = 'employee' } = req.body;

  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role });

  await user.save();
  res.status(201).json({ success: true, message: 'User registered successfully' });
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: "User with this email not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;
  console.log(`OTP for ${email}: ${otp}`); // Replace with real email service in production

  res.json({ success: true, message: "OTP sent to registered email (mocked)" });
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!otpStore[email] || otpStore[email] !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  const updatedUser = await User.findOneAndUpdate({ email }, { password: hashed });

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  delete otpStore[email];
  res.json({ success: true, message: 'Password updated successfully' });
};

export { login, verify };
