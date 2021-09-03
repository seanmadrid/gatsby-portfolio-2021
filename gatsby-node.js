/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.createPages = async function ({ actions, graphql }) {
  const result = await graphql(`
      query {
        allWpWork {
          nodes {
            slug
            id
          }
        }
      }
    `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const workTemplate = path.resolve(`./src/templates/work-template.js`)
  
  result.data.allWpWork.nodes.forEach(node => {
    const slug = node.slug
    const id = node.id
    actions.createPage({
      path: `/work/${slug}`,
      component: workTemplate,
      context: { id: id },
    })
  })
}