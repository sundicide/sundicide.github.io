/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }: any) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }: any) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`)
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              draft
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result: any) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges
      .filter(({ node }: any) => !node.frontmatter.draft)
      .forEach(({ node }: any) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          slug: node.fields.slug,
          context: {},
        })
      })
  })
}