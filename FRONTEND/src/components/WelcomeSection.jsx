import React from "react";

/**
 * Welcome banner with greeting and action buttons
 * @param {Object} props - Component props
 */
function WelcomeSection(props) {
  return (
    <div
      className="bg-teal-900 rounded-xl shadow-md mt-25 flex py-6 px-8 mx-5"
      style={{ background: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)" }}
    >
      <div className="text-white mt-2 font-bold">
        <h3 className="text-2xl mb-2">Hi, {props.name || "User"}!</h3>
        {props.message}
      </div>
      <div className="ml-55 mt-4 inline-flex gap-10">
        {props.btn1 && (
          <button
            onClick={props.onBtn1Click}
            className="hover:bg-teal-700 hover:text-white bg-white text-teal-800 px-6 rounded-full hover:opacity-95 cursor-pointer font-bold"
          >
            {props.btn1}
          </button>
        )}
        {props.btn2 && (
          <button
            onClick={props.onBtn2Click}
            className="hover:bg-teal-700 hover:text-white bg-white text-teal-800 px-6 rounded-full hover:opacity-95 cursor-pointer font-bold"
          >
            {props.btn2}
          </button>
        )}
      </div>
    </div>
  );
}

export default WelcomeSection;
