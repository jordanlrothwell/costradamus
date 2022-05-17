import React from "react";
import Auth from "../../utils/auth";
import styled from "styled-components";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

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

const SignupLink = styled.div`
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

const LogoutLink = styled.a`
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

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ButtonWrapper>
            <Link to="/Profile">
              <LoginLink className="noselect">Profile</LoginLink>
            </Link>
          {/* this is not using the Link component to logout or user and then refresh the application to the start */}
          <LogoutLink href="/" onClick={() => Auth.logout()}>
            Logout
          </LogoutLink>
        </ButtonWrapper>
      );
    } else {
      return (
        <ButtonWrapper>
          <Link to="/login">
            <LoginLink className="noselect">Login</LoginLink>
          </Link>
          <Link to="/signup">
            <SignupLink className="noselect">Sign Up</SignupLink>
          </Link>
        </ButtonWrapper>
      );
    }
  }

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
        <nav>{showNavigation()}</nav>
      </FlexBetweenContainer>
    </Header>
  );
}

export default Nav;
