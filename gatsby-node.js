exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const buildTemplate = require.resolve(`./src/templates/buildTemplate.tsx`)

  const buildPages = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/build/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
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

  buildPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.slug === "/faq/") return
    createPage({
      path: node.frontmatter.slug,
      component: buildTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}
