import React, { useEffect, useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import CardsTab from "../components/CardsTab";
import LeaveHistoryTable from "../components/LeaveHistoryTable";
import LeavePieChart from "../components/LeavePieChart";
import { useNavigate } from "react-router";
import { formatDate, getLeaveDays } from "../utils/dateFormatter";
import { getUser } from "../utils/storage";
import { fetchMyLeaves } from "../services/leaveService";

/**
 * Main user dashboard for viewing leave balances and recent requests
 */
const Dashboard = () => {
  const navigate = useNavigate();

  // Grab active user session and enforce auth
  const user = getUser();

  const [leaves, setLeaves] = useState([]);

  // Fetch user's leave history on mount
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await fetchMyLeaves(user._id);
        setLeaves(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaves();
  }, [user._id]);

  // Calculate total approved days taken
  const approvedLeaves = leaves
    .filter((leave) => leave.status === "Approved")
    .reduce((total, leave) => {
      const days = getLeaveDays(leave.startDate, leave.endDate);

      return total + days;
    }, 0);

  // Tally rejected and pending requests
  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "Rejected",
  ).length;

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "Pending",
  ).length;

  // Determine remaining leave balance
  const remainingBalance = user.totalLeaveBalance - approvedLeaves;

  // Configure stat card titles and values
  const title = [
    "Leave Entitlement",
    "Approved Leaves",
    "Rejected Requests",
    "Pending Requests",
    "Remaining Balance",
  ];
  const value = [
    user.totalLeaveBalance,
    approvedLeaves,
    rejectedLeaves,
    pendingLeaves,
    remainingBalance,
  ];

  // Format data for the pie chart
  const pieChartData = [
    { label: "Remaining Leave", value: remainingBalance, color: "#00C49F" },
    { label: "Used Leave", value: approvedLeaves, color: "#0088FE" },
  ];

  const columns = [
    { header: "Leave Type", key: "type" },
    { header: "Dates", key: "dates" },
    { header: "Days", key: "days" },
    { header: "Reason", key: "reason" },
    { header: "Status", key: "status" },
  ];

  // Sort descending by date and format recent leaves for the history table (max 5)
  const tableData = [...leaves]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5)
    .map((leave) => ({
      type: leave.leaveType,
      dates: `${formatDate(leave.startDate)} - ${formatDate(leave.endDate)}`,
      days: getLeaveDays(leave.startDate, leave.endDate),
      reason: leave.reason,
      status: leave.status,
    }));

  return (
    <div>

      {/* Top welcome banner with action routes */}
      <WelcomeSection
        name={user.fullName}
        message="Welcome back! Here's an overview of your leave requests and remaining leave balance."
        btn1="Apply For Leave"
        btn2="Check History"
        onBtn1Click={() => navigate("/leave/apply")}
        onBtn2Click={() => navigate("/leave/my-leaves")}
      />
      <CardsTab title={title} value={value} />

      {/* Bottom split view: Table and Chart */}
      <div className="flex flex-row">
        <div className="p-4 flex flex-col items-center w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Recent Leaves
          </h2>
          <LeaveHistoryTable columns={columns} tableData={tableData} />
        </div>
        <LeavePieChart data={pieChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
