// homepage
import React from "react";

import BuildContext from "../components/Lists/BuildContext";

import Auth from "../utils/auth";

const Home = () => {
  return (
    Auth.loggedIn() ? (
    <div>
      <BuildContext />
    </div>
  ) : (
    <div>
      <h1>You are not logged in</h1>
    </div>
  )
  );
};

export default Home;
