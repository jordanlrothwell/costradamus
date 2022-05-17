import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import footerLogo from "../../assets/footerLogo.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import youtube from "../../assets/youtube.png";

// have footer at bottom of page, but not fixed

const FooterStyled = styled.footer`
margin-bottom: 0;
  width: 100%;
  padding-top: 50px;
  background: #006198;
  margin-top: 200px;

`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 100px;
  flex-wrap: wrap;
`;

const FooterLogoContainer = styled.div`
  flex: 1 0 auto;
`;

const FooterLogo = styled.img`
  filter: brightness(10);
  margin-top: -6rem;
  margin-left: 2rem;
`;

const LinkGroupWrapper = styled.div`
  display: flex;
  gap: 60px;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LinkSpan = styled.span`
  color: white;
  font-weight: 500;
  font-family: "Source Sans Pro", sans-serif;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.66667px;
`;

const LinkStyled = styled.div`
  color: #bfbfbf;
  font-size: 13px;
  transition: 0.2s color;
  font-family: "Source Sans Pro", sans-serif;
  cursor: pointer;
`;

const SocialsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 20px;
`;

const SocialIcon = styled.img`
  max-width: 85%;
  transition: 0.2s transform;
`;

function Footer() {
  return (
    <FooterStyled>
      <FooterContainer>
        <FooterLogoContainer>
          <FooterLogo className="noselect" src={footerLogo}></FooterLogo>
        </FooterLogoContainer>
        <LinkGroupWrapper>
          <LinkGroup>
            <LinkSpan className="noselect">Features</LinkSpan>
            <LinksWrapper>
              <LinkStyled className="noselect">Compliance</LinkStyled>
              <LinkStyled className="noselect">Transparency</LinkStyled>
              <LinkStyled className="noselect">Customization</LinkStyled>
            </LinksWrapper>
          </LinkGroup>
          <LinkGroup>
            <LinkSpan className="noselect">Resources</LinkSpan>
            <LinksWrapper>
              <LinkStyled className="noselect">Legislation</LinkStyled>
              <LinkStyled className="noselect">Commentary</LinkStyled>
              <LinkStyled className="noselect">Regulatory Bodies</LinkStyled>
            </LinksWrapper>
          </LinkGroup>
          <LinkGroup>
            <LinkSpan className="noselect">Company</LinkSpan>
            <LinksWrapper>
              <LinkStyled className="noselect">About</LinkStyled>
              <LinkStyled className="noselect">Careers</LinkStyled>
              <LinkStyled className="noselect">Contact</LinkStyled>
            </LinksWrapper>
          </LinkGroup>
        </LinkGroupWrapper>
        <SocialsWrapper>
          <a className="noselect" href="#">
            <SocialIcon src={facebook} />
          </a>
          <a className="noselect" href="#">
            <SocialIcon src={twitter} />
          </a>
          <a className="noselect" href="#">
            <SocialIcon src={instagram} />
          </a>
          <a className="noselect" href="#">
            <SocialIcon src={youtube} />
          </a>
        </SocialsWrapper>
      </FooterContainer>
    </FooterStyled>
  );
}

export default Footer;
