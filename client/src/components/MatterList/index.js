import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_MATTERS, QUERY_ME } from "../../utils/queries";
import { Link } from "react-router-dom";
import { ADD_MATTER, REMOVE_MATTER } from "../../utils/mutations";
import styled from "styled-components";

import tinyLogo from "../../assets/tiny-logo.png";

function MatterList(props) {
  const { loading, error, data } = useQuery(QUERY_MATTERS, {
    variables: {
      username: props.username,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const matters = data.matters;

  return (
    <div>
      <h1> Matter List </h1>
      {matters.map((matter) => (
        <div key={matter._id}>
          <Link to={`/matter/${matter._id}`}>
            <h2>{matter.reference}</h2>
            <p>{matter.quantum}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MatterList;
