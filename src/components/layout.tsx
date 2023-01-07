/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";

import Header from "./header";
import "./layout.css";
import { StaticImage } from "gatsby-plugin-image";

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
};

const Wrapper = styled.main(props => ({
  backgroundColor: props.theme.colors.background,
}))

const Layout = ({ children }: LayoutProps) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <Wrapper>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Content>
          <main>{children}</main>
          <Footer>
            <p>© {new Date().getFullYear()}, Built with </p>
            <StaticImage
              src="../images/icon.png"
              alt="Gatsby G Logo"
              width={24}
              height={24}
              css={{
                marginLeft: 5,
              }}
            />
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Footer>
        </Content>
      </Wrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
