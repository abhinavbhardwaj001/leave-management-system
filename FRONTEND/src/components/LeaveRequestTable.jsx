import React from "react";

/**
 * Dynamic table for leave requests with admin actions
 * @param {Object} props - Component props
 */
const LeaveRequestTable = (props) => {
  // Map status strings to tailwind color classes
  const statusStyles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <div
      className="rounded-xl shadow-md overflow-hidden p-4 flex flex-col items-center w-full"
      style={{
        background:
          "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)",
      }}
    >
      <div className=" px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">Leave Requests</h2>
      </div>

      <div
        className="overflow-x-auto w-full rounded-2xl"
        style={{
          background: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
        }}
      >
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {/* Build headers from columns prop */}
              {props.columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left font-medium text-gray-600"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* Map over data to create rows */}
            {props.tableData.map((leave) => (
              <tr key={leave._id}>
                {props.columns.map((column) => {
                  if (column.key === "actions") {
                    return (
                      <td key={column.key} className="px-6 py-4">
                        {/* Only show action buttons if still pending */}
                        {leave.status === "Pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => props.onApprove(leave._id)}
                              className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => props.onReject(leave._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  }

                  if (column.key === "status") {
                    return (
                      <td key={column.key} className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[leave.status]}`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    );
                  }

                  return (
                    <td key={column.key} className="px-6 py-4">
                      {leave[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestTable;
