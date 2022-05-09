// header component
import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {Auth.loggedIn() ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <div>
        {Auth.loggedIn() ? (
          <Link to="/logout" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to="/register">Register</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
