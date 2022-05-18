import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import MatterList from "../components/MatterList";

const Profile = () => {

  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const me = data.me;

  return (
    <div>
      <MatterList username={me.username} />
    </div>
  );
};

export default Profile;
