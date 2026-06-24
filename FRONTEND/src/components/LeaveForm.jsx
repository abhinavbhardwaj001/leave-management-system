import React, { useState } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../utils/storage";
import { applyForLeave } from "../services/leaveService";

/**
 * Form for employees to submit new leave requests
 */
function LeaveForm() {
  const navigate = useNavigate();

  // Form field state
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const user = getUser();

  const handleSubmit = async () => {

    // Basic required field validation
    if (!startDate || !endDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    // Prevent negative date ranges
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date cannot be before start date");
      return;
    }
    try {

      // Post form data to the backend
      await applyForLeave({
        employeeId: user._id,
        leaveType,
        startDate,
        endDate,
        reason,
      });

      alert("Leave request submitted successfully");
      navigate("/user");
    } catch (error) {
      alert("Failed to submit leave request");
    }
  };

  return (
    <div className="p-6 w-full max-w-lg mx-auto mt-23 flex flex-col items-center" style={{background: "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)"}}>
      <h1 className="text-2xl font-bold text-gray-800 mb-5 ">Leave Form</h1>
      <div className="rounded-xl shadow-md p-6 w-full max-w-md mx-auto" style={{background: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)"}}>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Apply for Leave
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Leave Type
            </label>

            {/* Leave type dropdown */}
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Annual Leave</option>
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>

            {/* Date range pickers */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>

            {/* Reason text area */}
            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason..."
              className="w-full border border-gray-300 rounded-lg p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Form action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition cursor-pointer"
            >
              Submit
            </button>

            <button
              onClick={() => navigate("/user")}
              className="flex-1 border border-gray-300 hover:bg-gray-200 py-2.5 rounded-lg font-medium transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveForm;
