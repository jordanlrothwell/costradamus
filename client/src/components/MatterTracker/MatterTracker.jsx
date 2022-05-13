import React from "react";

import { useMatterContext } from "../../utils/MatterContext";

export default function MatterTracker() {
  const { matter, updateMatter } = useMatterContext();

  return (
    <div>
      <h1>Matter Tracker</h1>
      <div>
        <h2>Matter</h2>
        <p>{matter.name}</p>
      </div>
      <div>
        <h2>Costs</h2>
        <ul>
          {matter?.map((matter, index) => {
            return <li key={index}>{matter.id}</li>;
          })}
        </ul>
        <button
          onClick={() => {
            updateMatter({
              ...matter,
              costs: [...matter.costs],
            });
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
}
