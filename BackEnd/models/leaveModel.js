import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: String, required: true },
  reason: String,
  startDate: Date,
  endDate: Date,
  days: Number,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Leave', leaveSchema);
