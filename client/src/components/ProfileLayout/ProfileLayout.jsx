import React, { useState } from "react";
import styled from "styled-components";

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

export default function LoginForm() {
  
}
