// profile page
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: {
      username: "test",
    },
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>
        {data.user.username}
        {data.user.email}
      </p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Profile;
