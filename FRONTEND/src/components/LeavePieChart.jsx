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
    <div className="flex justify-center m-4 w-1/2 flex-col items-center scale-120">
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-8">
        Leave Distribution
      </h3>

      {/* Render MUI pie chart with donut styling */}
      <PieChart
        series={[
          {
            innerRadius: 40,
            outerRadius: 100,
            data: props.data,
            arcLabel: "value",
          },
        ]}
        {...settings}
      />
    </div>
  );
}
