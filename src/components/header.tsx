import { Link } from "gatsby";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import DarkModeButton from "./darkModeButton";

const Content = styled.div`
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.onBackground};
`;

const NavLink = styled(Link)`
  margin-left: 15px;
  line-height: 25px;
  text-decoration: none;
  display: inline-block;
  position: relative;
  color: ${(props) => props.theme.colors.onBackground};

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.theme.colors.onBackground};
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const GitHubLink = styled.a`
  margin-left: 15px;
  color: ${(props) => props.theme.colors.onBackground};
  text-decoration: none;
  display: inline-block;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${(props) => props.theme.colors.onBackground};
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const HomeLink = styled(NavLink)`
  margin-left: 0;
`;

const SiteHeader = styled.header`
  background: transparent;
  margin: 0 auto;
  max-width: 860px;
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
`;

const Header = ({ siteTitle }: any) => (
  <SiteHeader>
    <Content>
      <p>
        <HomeLink to="/">Home</HomeLink>
        {/* <NavLink to="/blog">Blog</NavLink> */}
        <GitHubLink href="https://github.com/sundicide">GitHub</GitHubLink>
        <DarkModeButton />
      </p>
    </Content>
  </SiteHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: "",
};

export default Header;
