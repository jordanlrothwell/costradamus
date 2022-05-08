import React from "react";
import { useMutation } from "@apollo/client";

// import graphql queries and mutations
import { ADD_USER } from "../utils/mutations";

// signup page component
const Home = () => {
  // add user mutation
  const [addUser] = useMutation(ADD_USER);

  // add user function
  const addUserFunc = async (e) => {
    e.preventDefault();
    // get user input
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // add user to database
    await addUser({
      variables: {
        username,
        email,
        password
      },
    });
    // clear input fields
    e.target.username.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
  };
  return (
    <div className="flex-column justify-flex-start min-100-vh">
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={addUserFunc}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
