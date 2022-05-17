// header component
import React from "react";
import styled from "styled-components";

import Auth from "../../utils/auth";

import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

const Header = styled.header`
  padding: 10px 0;
  background-color: #ffffff;
`;

const FlexBetweenContainer = styled.div`
  position: relative;
  width: 78%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;

const LogoWrapper = styled.div`
  height: 10rem;
`;

const LinkWrapper = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  max-width: 100%;
  height: 10rem;
`;

const LogoText = styled.h1`
  font-family: "Lalezar", cursive;
  margin-left: -2rem;
  margin-top: 0.2rem;
  color: #dc5c04;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20rem;
  gap: 5rem;
  a {
    font-family: "Source Sans Pro", sans-serif;
  }
`;

const LoginLink = styled.div`
  color: #0487c4;
  background-color: white;
  font-weight: 700;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 150px;
  padding: 7px 21px;
  font-size: 1.2rem;
`;

const SignUpLink = styled.div`
  color: white;
  background-color: #0487c4;
  font-weight: 700;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 150px;
  padding: 7px 21px;
  font-size: 1.2rem;
`;

export default function Navbar() {
  if (Auth.loggedIn()) {
    return (
      <Header>
        <FlexBetweenContainer>
          <Link to="/">
            <LogoWrapper>
              <LinkWrapper>
                <Logo className="noselect" src={logo} />
                <LogoText className="noselect">costradamus</LogoText>
              </LinkWrapper>
            </LogoWrapper>
          </Link>
          <ButtonWrapper>
            <Link to="/profile">
              <LoginLink className="noselect">
                Profile
              </LoginLink>
            </Link>
            <Link to="/" onClick={() => Auth.logout()}>
              <SignUpLink className="noselect">Log Out</SignUpLink>
            </Link>{" "}
          </ButtonWrapper>
        </FlexBetweenContainer>
      </Header>
    );
  } else {
    return (
      <Header>
        <FlexBetweenContainer>
          <Link to="/">
            <LogoWrapper>
              <LinkWrapper>
                <Logo className="noselect" src={logo} />
                <LogoText className="noselect">costradamus</LogoText>
              </LinkWrapper>
            </LogoWrapper>
          </Link>
          <ButtonWrapper>
            <Link to="/login">
              <LoginLink className="noselect">Login</LoginLink>
            </Link>
            <Link to="/signup">
              <SignUpLink className="noselect">Sign Up</SignUpLink>
            </Link>
          </ButtonWrapper>
        </FlexBetweenContainer>
      </Header>
    );
  }
}
