// // import jwt from 'jsonwebtoken';
// // import User from '../models/User.js';

// // const verifyUser = async (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization?.split(' ')[1];

// //     if (!token) {
// //       return res.status(401).json({ success: false, error: "Token Not Provided" });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_KEY);
// //     if (!decoded) {
// //       return res.status(401).json({ success: false, error: "Token Not Valid" });
// //     }

// //     const user = await User.findById(decoded._id).select('-password');
// //     if (!user) {
// //       return res.status(404).json({ success: false, error: "User Not Found" });
// //     }

// //     req.user = user;
// //     next();
// //   } catch (error) {
// //     console.error("Auth Middleware Error:", error.message);
// //     return res.status(500).json({ success: false, error: "Server Error" });
// //   }
// // };

// // export default verifyUser;



// // middleware/authMiddleware.js
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ success: false, error: "Token Not Provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     if (!decoded) {
//       return res.status(401).json({ success: false, error: "Token Not Valid" });
//     }

//     const user = await User.findById(decoded._id).select('-password');
//     if (!user) {
//       return res.status(404).json({ success: false, error: "User Not Found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     return res.status(500).json({ success: false, error: "Server Error" });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, error: "Access Denied" });
//     }
//     next();
//   };
// };



// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Named export of protect function
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// Named export of authorize function
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: "Access denied" });
    }
    next();
  };
};

