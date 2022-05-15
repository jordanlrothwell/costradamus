import React from "react";
import styled from "styled-components";

import mainLogo from "../../assets/images/mainLogo.png";

const LandingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-left: 12%;
  overflow-x: hidden;
  margin-top: -5%;
`;

const LandingTextWrapper = styled.div`
  display: grid;
    grid-template-rows: 1fr 1fr;
  margin-top: 4rem;
`;

const LandingHeader = styled.h1`
  font-size: 4rem;
  line-height: 1.15;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: bold;
`;

const LandingSubheader = styled.p`
  font-size: 18px;
  max-width: 500px;
  margin-top: 1.5rem;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.2rem;
`;

const LandingImage = styled.img`
  position: relative;
  margin-top: -1.5rem;
`;

export default function Landing() {
  return (
    <LandingContainer>
      <LandingTextWrapper>
        <LandingHeader>Legal costs shouldn't be unpredictable</LandingHeader>
        <LandingSubheader>
          We make billing easy, accurate, and transparent. Sign up for a free
          account and get started.
        </LandingSubheader>
      </LandingTextWrapper>
      <LandingImage src={mainLogo} />
    </LandingContainer>
  );
}
