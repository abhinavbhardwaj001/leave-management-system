import { PieChart } from "@mui/x-charts/PieChart";

// Base layout settings for the chart
const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: false,
};

/**
 * Pie chart showing breakdown of leave types
 * @param {Object} props - Component props
 */
export default function LeavePieChart(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto bg-white/50 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
        Leave Distribution
      </h3>

      {/* Render MUI pie chart with donut styling */}
      <div className="flex justify-center w-full">
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 100,
              data: props.data,
              arcLabel: "value",
            },
          ]}
          {...settings}
        />
      </div>
    </div>
  );
}
