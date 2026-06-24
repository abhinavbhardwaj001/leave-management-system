import React from "react";
import StatCard from "./StatCard";

/**
 * Renders a row of stat cards
 * @param {Object} props - Component props
 */
function CardsTab(props) {
  return (
    <div className="flex flex-wrap justify-around mt-8 mb-8 mx-10">

      {/* Render individual cards for each stat */}
      <StatCard title={props.title[0]} value={props.value[0]} />
      <StatCard title={props.title[1]} value={props.value[1]} />
      <StatCard title={props.title[2]} value={props.value[2]} />
      <StatCard title={props.title[3]} value={props.value[3]} />
      <StatCard title={props.title[4]} value={props.value[4]} />
    </div>
  );
}

export default CardsTab;
