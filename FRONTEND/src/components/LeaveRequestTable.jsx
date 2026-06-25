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
      className="rounded-xl shadow-md overflow-hidden flex flex-col w-full"
      style={{
        background:
          "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)",
      }}
    >
      <div className="px-4 md:px-6 py-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
          Leave Requests
        </h2>
      </div>

      <div
        className="overflow-x-auto w-full rounded-b-xl"
        style={{
          background: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
        }}
      >
        <table className="w-full text-sm min-w-max">
          <thead className="bg-gray-200/50 border-b border-gray-300">
            <tr>
              {/* Build headers from columns prop */}
              {props.columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 md:px-6 py-3 text-left font-bold text-gray-70"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200/50">
            {/* Map over data to create rows */}
            {props.tableData.map((leave) => (
              <tr
                key={leave._id}
                className="hover:bg-white/40 transition-colors"
              >
                {props.columns.map((column) => {
                  if (column.key === "actions") {
                    return (
                      <td
                        key={column.key}
                        className="px-4 md:px-6 py-4 whitespace-nowrap"
                      >
                        {/* Only show action buttons if still pending */}
                        {leave.status === "Pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => props.onApprove(leave._id)}
                              className="px-3 py-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer active:scale-95 transition-transform font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => props.onReject(leave._id)}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 cursor-pointer active:scale-95 transition-transform font-medium"
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
                      <td
                        key={column.key}
                        className="px-4 md:px-6 py-4 whitespace-nowrap"
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[leave.status]}`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={column.key}
                      className="px-4 md:px-6 py-4 whitespace-nowrap"
                    >
                      {leave[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
            {props.tableData.length === 0 && (
              <tr>
                <td
                  colSpan={props.columns.length}
                  className="text-center py-8 text-gray-500"
                >
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequestTable;
