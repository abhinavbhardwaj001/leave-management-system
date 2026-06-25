import React from "react";

/**
 * Welcome banner with greeting and action buttons
 * @param {Object} props - Component props
 */
function WelcomeSection(props) {
  return (
    <div
      className="bg-teal-900 rounded-xl shadow-md mt-20 md:mt-28 flex flex-col md:flex-row md:justify-between md:items-center py-6 px-5 md:px-8 mx-4 md:mx-6"
      style={{ background: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)" }}
    >
      <div className="text-white font-bold mb-5 md:mb-0 text-center md:text-left">
        <h3 className="text-xl md:text-2xl mb-1 md:mb-2">
          Hi, {props.name || "User"}!
        </h3>
        <p className="text-sm md:text-base font-normal md:font-bold opacity-90">
          {props.message}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto">
        {props.btn1 && (
          <button
            onClick={props.onBtn1Click}
            className="hover:bg-teal-700 hover:text-white bg-white text-teal-800 px-6 py-3 rounded-full hover:opacity-95 cursor-pointer font-bold transition-colors w-full sm:w-auto text-center active:scale-95 shadow-sm"
          >
            {props.btn1}
          </button>
        )}
        {props.btn2 && (
          <button
            onClick={props.onBtn2Click}
            className="hover:bg-teal-700 hover:text-white bg-white text-teal-800 px-6 py-3 rounded-full hover:opacity-95 cursor-pointer font-bold transition-colors w-full sm:w-auto text-center active:scale-95 shadow-sm"
          >
            {props.btn2}
          </button>
        )}
      </div>
    </div>
  );
}

export default WelcomeSection;
