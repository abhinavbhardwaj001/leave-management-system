import User from "../models/User.js";
import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  const { employeeId, leaveType, startDate, endDate, reason } = req.body;
  const leave = await Leave.create({ employeeId, leaveType, startDate, endDate, reason });
  
  res.status(201).json({
    message: "Leave applied successfully",
    leave,
  });
};

export const getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({ employeeId: req.params.id });
  res.json(leaves);
};
