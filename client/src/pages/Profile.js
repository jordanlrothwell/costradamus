// profile page
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

const Profile = () => {
 const { data, loading, error } = useQuery(QUERY_USER);

 
};

export default Profile;
