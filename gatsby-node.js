const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const buildTemplate = require.resolve(`./src/templates/buildTemplate.tsx`)

  const buildPages = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/build/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (buildPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  await buildPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: buildTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
      },
    })
  })
}
