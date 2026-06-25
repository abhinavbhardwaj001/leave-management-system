import React from "react";

/**
 * Renders a table showing past leave requests
 * @param {Object} props - Component props
 */
const LeaveHistoryTable = (props) => {
  // Map statuses to tailwind colors
  const statusStyles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col w-full"
      style={{
        background: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
      }}
    >
      <div className="overflow-x-auto w-full">
        <table className="text-sm w-full min-w-max">
          <thead className="bg-gray-200/50 w-full border-b border-gray-300">
            <tr>
              {/* Render table headers dynamically */}
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
          <tbody className="divide-y divide-gray-200/50">
            {/* Handle empty data state */}
            {props.tableData.length === 0 ? (
              <tr>
                <td
                  colSpan={props.columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No leave records found
                </td>
              </tr>
            ) : (
              props.tableData.map((row, index) => (
                <tr key={row._id || index} className="hover:bg-white/40 transition-colors">
                  {props.columns.map((col) => (
                    <td key={col.key} className="px-4 md:px-6 py-4 whitespace-nowrap">
                      {/* Render styled pill for status column */}
                      {col.key === "status" ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[row.status]}`}
                        >
                          {row.status}
                        </span>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistoryTable;
