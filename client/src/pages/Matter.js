import React from "react";
import { useParams } from "react-router-dom";

import Builder from "../components/Builder";

function Matter() {
  const matterId = useParams();
  return (
    <div>
      <Builder matterId={matterId} />
    </div>
  );
}

export default Matter;
