/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require(`lodash`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // The “graphql” function allows us to run arbitrary
  // queries against the local Gatsby GraphQL schema. Think of
  // it like the site has a built-in database constructed
  // from the fetched data that you can run queries against.
  const result = await graphql(
    `
      {
        allWpWork {
          edges {
            node {
              id
              slug
              status
              content(format: RENDERED)
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    const pageTemplate = path.resolve(`./src/templates/work-template.js`)

    _.each(result.data.allWpWorks.edges, edge => {
      createPage({
        path: `/work/${edge.node.slug}/`,
        component: slash(pageTemplate),
        context: {
          id: edge.node.id,
          canonical: `https://seanmadrid.com/work/${edge.node.slug}/`,
        },
      })
    })
  })
}