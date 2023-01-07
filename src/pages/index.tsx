import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Card } from "theme-ui";
import BlogCard from "../components/BlogCard";

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`;

const Title = styled.h1((props) => ({
  color: props.theme.colors.onBackground,
}));

const IndexPage = ({ data }: any) => {
  return (
    <Layout>
      <Seo title="Blog" />
      <Content>
        <Title>Blog</Title>
        {data.allMarkdownRemark.edges
          // .filter(({ node }: any) => {
          //   const rawDate = node.frontmatter.rawDate
          //   const date = new Date(rawDate)
          //   return date < new Date()
          // })
          .map(({ node }: any) => (
            <BlogCard node={node} />
          ))}
      </Content>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            rawDate: date
            path
          }
          fields {
            slug
          }
          timeToRead
          excerpt
        }
      }
    }
  }
`;
