import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import Seo from "../components/seo";

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`;

const MarkedHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
  color: ${(props) => props.theme.colors.error};
  background-image: linear-gradient(
    -100deg,
    ${(props) => `hsl(${props.theme.colors.errorContainerHsl} / 0.15)`},
    ${(props) => `hsl(${props.theme.colors.errorContainerHsl} / 0.8) 100%`},
    ${(props) => `hsl(${props.theme.colors.errorContainerHsl} / 0.25)`}
  );
`;

const HeaderDate = styled.h3`
  margin-top: 10px;
  color: #606060;
`;

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkdownContent = styled.div`
  color: ${(props) => props.theme.colors.onBackground};
  a {
    text-decoration: none;
    position: relative;
    color: ${(props) => props.theme.colors.surfaceTint};

    background-image: linear-gradient(
      ${(props) => props.theme.colors.outlineVariant},
      ${(props) => props.theme.colors.outlineVariant}
    );
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }

  a > code:hover {
    text-decoration: underline;
  }

  p > code[class*=language-],
  li > code[class*=language-]
  {
    background: ${(props) => props.theme.colors.tertiaryContainer};
    color: ${(props) => props.theme.colors.onTertiaryContainer};
  }
  .table-of-contents {
    background: ${(props) => props.theme.colors.surfaceVariant};
    color: ${(props) => props.theme.colors.onSurfaceVariant};
    a {
      background: transparent;
    }
    ol {
      li {
        p {
          margin: 0;
        }
      }
    }
  }
`;

const Data = ({ data }: any) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Content>
        <MarkedHeader>{post.frontmatter.title}</MarkedHeader>
        <HeaderDate>
          {post.frontmatter.date} - {post.timeToRead} min
        </HeaderDate>
        <MarkdownContent dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  );
};

export default Data;

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
      }
      timeToRead
    }
  }
`;
