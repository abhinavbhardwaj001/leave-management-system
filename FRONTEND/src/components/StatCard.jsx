import React, { useState } from "react";

/**
 * Renders a stat card with hover effect
 * @param {Object} props - Component props
 */
const StatCard = (props) => {
  // Toggle hover state for gradient swap
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-zinc-950 rounded-full shadow-2xl px-15 border border-gray-200 py-4 flex flex-col items-center justify-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 "
      style={{
        background: hover
          ? "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)"
          : "linear-gradient(to top, #f77062 0%, #fe5196 100%)"
      }}
    >
      <h3 className="text-sm font-medium ">{props.title}</h3>

      <p className="text-2xl font-bold ">{props.value}</p>
    </div>
  );
};

export default StatCard;
