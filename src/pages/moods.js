import React from "react"
import { Box, Heading, Flex } from "@chakra-ui/react"

import { StaticImage, GatsbyImage } from "gatsby-plugin-image"

import { Link, graphql } from "gatsby"

import Banner from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Product = ({ data }) => {
  const strains = data.allSanityStrain.edges
  return (
    <Layout>
      <Seo title="Product" />
      <Banner>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 5}
          src={"../images/aura-product-main-cover-b.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
      </Banner>
      <Box
        textAlign="center"
        w="95%"
        maxWidth="1240px"
        m={["3.5rem auto 0", "4rem auto 0", "4.5rem auto 0", "5rem auto 0"]}
      >
        <Heading as="h2" mb="1rem">
          Select your effect
        </Heading>
      </Box>
      <Banner>
        <Flex flexWrap="wrap" justifyContent="space-between">
          {strains.map((strain, i) => (
            <Box
              key={i}
              w={["100%", "100%", "100%", "50%", "50%", "50%"]}
              p="1rem"
              position="relative"
              transition="all 275ms ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              <Link to={"/" + strain.node.slug.current}>
                <GatsbyImage
                  image={strain.node.thumbnailImage.asset.gatsbyImageData}
                  layout="fullWidth"
                  formats={["auto", "webp", "avif"]}
                  alt={strain.node.title + " Image"}
                  style={{
                    border: "1px solid rgba(0,0,0,0)",
                    borderRadius: "8px",
                    width: "100%",
                    filter: "brightness(0.6)",
                  }}
                />
              </Link>
              <Box position="absolute" bottom="45px" left="55px">
                <Heading
                  as="h6"
                  variant="h6"
                  mt="0"
                  pt="0"
                  color="white"
                  mb="0"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  {strain.node.effects}
                </Heading>
                <Heading as="h4" variant="h4" mb="0.5rem" pb="0" color="white">
                  {strain.node.title}
                </Heading>
              </Box>
            </Box>
          ))}
        </Flex>
      </Banner>
    </Layout>
  )
}

export default Product

export const query = graphql`
  query StrainQuery {
    allSanityStrain {
      edges {
        node {
          id
          slug {
            current
          }
          title
          effects
          thumbnailImage {
            asset {
              gatsbyImageData(aspectRatio: 1.6)
            }
          }
        }
      }
    }
  }
`
