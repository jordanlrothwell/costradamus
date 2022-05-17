import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_MATTERS } from "../../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const MatterList = () => {
  const { username } = Auth.getProfile().data;

  const { data } = useQuery(QUERY_MATTERS, {
    variables: {
      username: username,
    },
  });

  if (!data?.matters.length) {
    return <h3>No Matters Yet</h3>;
  }

  return (
    <div></div>
  )
};

export default MatterList;
