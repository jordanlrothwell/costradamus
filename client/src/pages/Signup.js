import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

// icons
import userIcon from "../assets/svg/userIcon.svg";
import emailIcon from "../assets/svg/emailIcon.svg";
import lockIcon from "../assets/svg/lockIcon.svg";

const GridContainer = styled.div`
  margin-top: 10rem;
  inline-size: 90%;
  margin-inline: auto;
  max-inline-size: 30rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.875rem;
  height: 100%;
`;

const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const Label = styled.label`
  padding: 1rem;
  padding-left: 2rem;
  background-color: #7cc4eb;
`;

const UserIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: -0.5rem;
`;

const UserInput = styled.input`
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0487c4;
  }
  &:focus {
    background-color: #0487c4;
  }
  &:active {
    background-color: #0487c4;
  }
  background-color: #7cc4eb;
`;

const EmailIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: -0.5rem;
`;

const EmailInput = styled.input`
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0487c4;
  }
  &:focus {
    background-color: #0487c4;
  }
  &:active {
    background-color: #0487c4;
  }
  background-color: #7cc4eb;
`;

const PasswordIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-left: -0.5rem;
`;

const PasswordInput = styled.input`
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0487c4;
  }
  &:focus {
    background-color: #0487c4;
  }
  &:active {
    background-color: #0487c4;
  }
  background-color: #7cc4eb;
`;

const SubmitInput = styled.input`
  background-image: none;
  border: 0;
  color: #ffffff;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.25rem;
  outline: 0;
  padding: 1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #dc5c04;
  }
  &:focus {
    background-color: #dc5c04;
  }
  &:active {
    background-color: #dc5c04;
  }
  background-color: #f9b15b;
  cursor: pointer;
`;

const ColumnHeader = styled.div`
border-radius: 3px;
background-color: #FACB84;
padding: 1rem;
margin-bottom: 1rem;
`;

const ColumnTitle = styled.h2`
margin-bottom: -1rem;
color: #dc5c04;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
  font-family: "Lalezar", cursive;
`;

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <GridContainer>
         <ColumnHeader className="noselect">
        <ColumnTitle className="noselect">Sign Up</ColumnTitle>
      </ColumnHeader>
      <Form onSubmit={handleFormSubmit}>
        <Field>
          <Label>
            <UserIcon className="noselect" src={userIcon}></UserIcon>
          </Label>
          <UserInput
            placeholder="User"
            name="username"
            type="username"
            value={formState.username}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>
            <EmailIcon className="noselect" src={emailIcon}></EmailIcon>
          </Label>
          <EmailInput
            placeholder="Email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </Field>
        <Field>
          <Label>
            <PasswordIcon className="noselect" src={lockIcon}></PasswordIcon>
          </Label>
          <PasswordInput
            placeholder="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </Field>
        <SubmitInput
          className="noselect"
          type="submit"
          value="Sign Up"
        ></SubmitInput>
      </Form>
    </GridContainer>
  );
}

export default Signup;