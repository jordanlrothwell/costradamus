import React from "react";

import CostList from "./CostList";

export default function CostContainer() {
  return (
    <div className="layout__wrapper">
      <div className="layout__header">
        <div className="app-bar">
          <div className="app-bar__title">Costs</div>
        </div>
      </div>
    <CostList/>
    </div>
  );
}
