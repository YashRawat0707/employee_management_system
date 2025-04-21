import Leave from '../models/leaveModel.js';
import Employee from '../models/Employee.js';

export const getLeaves = async (req, res) => {
  try {
    let leaves = await Leave.find().populate({
      path: 'employeeId',
      populate: [
        { path: 'userId', select: 'name employeeId profileImage' },
        { path: 'department', select: 'dep_name' }
      ]
    });
    if (req.user.role === 'employee') {
      const emp = await Employee.findOne({ userId: req.user.id });
      leaves = await Leave.find({ employeeId: emp._id }).populate({
        path: 'employeeId',
        populate: [
          { path: 'userId', select: 'name employeeId profileImage' },
          { path: 'department', select: 'dep_name' }
        ]
      });
    }
    return res.status(200).json({ leaves });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getLeaveDetail = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate({
      path: 'employeeId',
      populate: [
        { path: 'userId', select: 'name employeeId profileImage' },
        { path: 'department', select: 'dep_name' }
      ]
    });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    return res.status(200).json({ leave });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    leave.status = req.body.status;
    await leave.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
