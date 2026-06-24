import React, { useEffect, useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import CardsTab from "../components/CardsTab";
import LeaveRequestTable from "../components/LeaveRequestTable";
import { formatDate } from "../utils/dateFormatter";
import { fetchAdminDashboard, approveLeave, rejectLeave } from "../services/adminService";
import { getUser } from "../utils/storage";
/**
 * Admin dashboard view for managing global leave requests
 */
const AdminPage = () => {
  const user = getUser();

  // Titles for the stat cards
  const title = [
    "Total Employees",
    "Total Leave Requests",
    "Approved Leaves",
    "Rejected Requests",
    "Pending Requests",
  ];

  const [stats, setStats] = useState([]);
  const [tableData, setTableData] = useState([]);

  const columns = [
    { header: "Employee Name", key: "employeeName" },
    { header: "Leave Type", key: "leaveType" },
    { header: "Start Date", key: "startDate" },
    { header: "End Date", key: "endDate" },
    { header: "Reason", key: "reason" },
    { header: "Status", key: "status" },
    { header: "Actions", key: "actions" },
  ];

  const fetchDashboard = async () => {
    const data = await fetchAdminDashboard();
    setStats(data.stats);

    // Sort descending by date and format for the table
    const formatted = [...data.leaves]
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
      .map((leave) => ({
        _id: leave._id,
        employeeName: leave.employeeId?.fullName || "Unknown User",
        leaveType: leave.leaveType,
        startDate: formatDate(leave.startDate),
        endDate: formatDate(leave.endDate),
        reason: leave.reason,
        status: leave.status,
      }));

    setTableData(formatted);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleApprove = async (id) => {
    try {
      // hit approve endpoint and refresh data
      await approveLeave(id);
      fetchDashboard();
    } catch (error) {
      console.error("Failed to approve leave:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // hit reject endpoint and refresh data
      await rejectLeave(id);
      fetchDashboard();
    } catch (error) {
      console.error("Failed to reject leave:", error);
    }
  };
  return (
    <div>
      <WelcomeSection
        name={user.fullName}
        message="Welcome back, Admin ! Here you can manage all leave requests."
      />
      <CardsTab title={title} value={stats} />
      <LeaveRequestTable
        columns={columns}
        tableData={tableData}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminPage;
