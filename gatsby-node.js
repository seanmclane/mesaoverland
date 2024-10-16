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

  const buildBuildPages = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/build/" } }
        sort: { frontmatter: {date: DESC}}
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

  const modelTemplate = require.resolve(`./src/templates/modelTemplate.tsx`)
  const configuratorTemplate = require.resolve(
    `./src/templates/configuratorTemplate.tsx`
  )

  const buildModelPages = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/campers/" } }
        limit: 100
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
  if (buildBuildPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  await buildBuildPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: buildTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
      },
    })
  })

  if (buildModelPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  await buildModelPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: modelTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
      },
    })
  })

  await buildModelPages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug + "configure",
      component: configuratorTemplate,
      context: {
        // additional data can be passed via context
        slug: node.fields.slug,
      },
    })
  })
}

// gatsby-node.js
const express = require(`express`)

// Enable development support for serving HTML from `./static` folder
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static("static"))
}