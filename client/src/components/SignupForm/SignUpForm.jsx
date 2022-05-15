import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

// icons
import userIcon from "../../assets/images/svg/userIcon.svg";
import emailIcon from "../../assets/images/svg/emailIcon.svg";
import lockIcon from "../../assets/images/svg/lockIcon.svg";

const GridContainer = styled.div`
  margin-top: 15rem;
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

export default function SignupForm() {
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
