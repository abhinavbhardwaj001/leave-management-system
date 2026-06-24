import React, { useState, useEffect } from "react";
import LeaveHistoryTable from "../components/LeaveHistoryTable";
import axios from "axios";
import { formatDate, getLeaveDays } from "../utils/dateFormatter";
import { getUser } from "../utils/storage";
import { fetchMyLeaves } from "../services/leaveService";

/**
 * Full page view for a user's entire leave history
 */
const LeaveHistoryPage = () => {
  // Grab session and enforce auth
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

  const columns = [
    { header: "Leave Type", key: "type" },
    { header: "Dates", key: "dates" },
    { header: "Days", key: "days" },
    { header: "Reason", key: "reason" },
    { header: "Status", key: "status" },
  ];

  // Sort descending by date and format for the table
  const tableData = [...leaves]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map((leave) => ({
      type: leave.leaveType,
      dates: `${formatDate(leave.startDate)} - ${formatDate(leave.endDate)}`,
      days: getLeaveDays(leave.startDate, leave.endDate),
      reason: leave.reason,
      status: leave.status,
    }));

  return (
    <div className="p-4 flex flex-col items-center mt-25 ">
      {/* Main content wrapper */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave History</h2>
      <LeaveHistoryTable columns={columns} tableData={tableData} />
    </div>
  );
};

export default LeaveHistoryPage;
