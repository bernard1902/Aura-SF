/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require("node-fetch")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityProduct {
        edges {
          node {
            mainImage {
              asset {
                gatsbyImageData(aspectRatio: 0.85)
              }
            }
            cartImage: mainImage {
              asset {
                gatsbyImageData(aspectRatio: 1)
              }
            }
            _rawBody
            title
            profile {
              percentage
              title
            }
            cannbinoids
            cbd
            thc
            slug {
              current
            }
            strain {
              effects
              profile {
                percentage
                title
              }
            }
            weight
            price
          }
        }
      }
      allSanityStrain {
        edges {
          node {
            id
            slug {
              current
            }
            title
            description
            effects
            timeOfUse
            suggestedPairings
            strainName
            color
            _rawBody
            bottomImages {
              asset {
                gatsbyImageData
              }
            }
            carouselImages {
              asset {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            thumbnailImage {
              asset {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const strain = result.data.allSanityStrain.edges || []
  const products = result.data.allSanityProduct.edges || []

  strain.forEach((edge, index) => {
    const path = `/${edge.node.slug.current}`

    createPage({
      path,
      component: require.resolve("./src/templates/strain.js"),
      context: { strain: edge.node },
    })
  })

  products.forEach((edge, index) => {
    const path = `/store/${edge.node.slug.current}`

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { product: edge.node },
    })
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  getNodesByType,
}) => {
  const { createNode } = actions

  const siteSettings = getNodesByType("SanitySiteSettings")

  const countyTaxURL = siteSettings[0].countyTaxes.asset._ref

  const baseURL = "https://cdn.sanity.io/files/7az0ftyp/production/"
  const extension = ".json"
  const referenceURL = countyTaxURL.split("-")[1]
  const finalURL = baseURL + referenceURL + extension

  let responseJson = []

  try {
    let response = await fetch(finalURL)
    responseJson = await response.json()
  } catch (error) {
    console.error(error)
  }

  responseJson.forEach(resp => {
    const node = {
      city: resp.City,
      rate: resp.Rate,
      county: resp.County,
      id: createNodeId(`county-tax-${resp.City}`),
      internal: {
        type: "CountyTax",
        contentDigest: createContentDigest(resp),
      },
    }
    createNode(node)
  })
}
