import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, graphql } from "gatsby";
import { useState } from "react";
import { Card } from "theme-ui";

const Div = styled(Card)((props) => ({
  backgroundColor: props.theme.colors.cardBgColor,
  padding: props.theme.space[3],
  margin: `${props.theme.space[3]}px 0`,
  opacity: `${props.hovering ? 0.7 : 1}`,
}));

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`;

const MarkerHeader = styled.h3((props) => ({
  display: "inline",
  borderRadius: "1em 0 1em 0",
  color: props.theme.colors.onSurface,
}));

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`;

const Excerpt = styled.p((props) => ({
  color: props.theme.colors.onSurfaceVariant,
}));

export default function BlogCard({ node }) {
  const [hovering, setHovering] = useState(false);
  return (
    <Div key={node.id} hovering={hovering}>
      <Link
        to={node.frontmatter.path}
        css={css`
                  text-decoration: none;
                  color: inherit;
                `}
      >
        <MarkerHeader
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {node.frontmatter.title}
        </MarkerHeader>
      </Link>
      <div>
        <ArticleDate>{node.frontmatter.date}</ArticleDate>
        <ReadingTime> - {node.timeToRead} min</ReadingTime>
      </div>
      <Excerpt>{node.excerpt}</Excerpt>
    </Div>
  );
}
