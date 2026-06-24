import Leave from "../models/Leave.js";
import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  const totalEmployees = await User.countDocuments({ role: "employee" });
  const totalRequests = await Leave.countDocuments();
  const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
  const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
  const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });
  
  const leaves = await Leave.find({}).populate("employeeId", "fullName");
  
  res.json({
    stats: [
      totalEmployees,
      totalRequests,
      approvedLeaves,
      rejectedLeaves,
      pendingLeaves,
    ],
    leaves,
  });
};

export const approveLeave = async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: "Approved" },
    { returnDocument: "after" }
  );

  if (!leave) {
    return res.status(404).json({ message: "Leave not found" });
  }

  res.json({ message: "Leave approved", leave });
};

export const rejectLeave = async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: "Rejected" },
    { returnDocument: "after" }
  );

  if (!leave) {
    return res.status(404).json({ message: "Leave not found" });
  }

  res.json({ message: "Leave rejected", leave });
};