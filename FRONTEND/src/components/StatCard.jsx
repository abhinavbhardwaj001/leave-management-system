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
      className="text-zinc-950 border border-gray-200 
        flex flex-col items-center justify-center 
        transition-all delay-150 duration-300 ease-in-out 
        shadow-lg md:shadow-2xl
        rounded-2xl md:rounded-full 
        py-4 md:py-5
        px-4 sm:px-6 md:px-12 lg:px-14
        active:scale-95 md:active:scale-100
        md:hover:-translate-y-1 md:hover:scale-110"
      style={{
        background: hover
          ? "linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)"
          : "linear-gradient(to top, #f77062 0%, #fe5196 100%)",
      }}
    >
      <h3 className="ttext-xs sm:text-sm font-medium text-center whitespace-nowrap">
        {props.title}
      </h3>

      <p className="text-xl sm:text-2xl font-bold mt-1 text-center">
        {props.value}
      </p>
    </div>
  );
};

export default StatCard;
