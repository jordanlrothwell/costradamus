import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";

// auth middleware
import Auth from "../utils/auth";

// icons
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

const ErrorField = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

const ErrorText = styled.p`
  color: #dc5c04;
  font-size: 1.25rem;
  font-weight: 500;
  transition: color 0.3s;
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

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <GridContainer>
      <ColumnHeader className="noselect">
        <ColumnTitle className="noselect">Login</ColumnTitle>
      </ColumnHeader>
      <Form onSubmit={handleFormSubmit}>
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

        <SubmitInput type="submit" value="Sign In"></SubmitInput>
        {error ? (
          <ErrorField>
            <ErrorText className="fade-out noselect">{error.message}</ErrorText>
          </ErrorField>
        ) : null}
      </Form>
    </GridContainer>
  );
}

export default Login;
