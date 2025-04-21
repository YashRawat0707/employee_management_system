import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRoutes from './routes/employeeRoutes.js';
import salaryRoutes from './routes/salaryRoutes.js';
import leaveRouter from './routes/leave.js';
import dashboardRouter from './routes/dashboard.js';
import performanceRouter from './routes/performanceRoutes.js'; // ✅ new

import connecToDatabase from './db/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connecToDatabase();

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employees', employeeRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/leaves', leaveRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/performance', performanceRouter); // ✅ new

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
