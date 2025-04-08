import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import connecToDatabase from './db/db.js';
import employeeRoutes from './routes/employeeRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // 

connecToDatabase(); // Ensure database connection works

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is missing

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
