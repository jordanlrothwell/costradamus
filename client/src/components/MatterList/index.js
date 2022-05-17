import React from "react";
import { Link } from "react-router-dom";

const MatterList = ({ matters }) => {
  if (!matters.length) {
    return <h3>No Matters Yet</h3>;
  }

  return (
    <div>
      {matters &&
        matters.map((matter) => (
          <div key={matter._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {
                <Link
                  className="text-light"
                  to={`/profiles/${matter.matterAuthor}`}
                >
                  {matter.reference}
                </Link>
              }
            </h4>
            <div className="card-body bg-light p-2">
              <p>{matter.reference}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/matters/${matter._id}`}
            >
              Join the discussion on this matter.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MatterList;
