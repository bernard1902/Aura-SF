import React from "react"
import { Box, Flex, Text, Heading } from "@chakra-ui/react"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { GatsbyImage } from "gatsby-plugin-image"

import PortableText from "@sanity/block-content-to-react"

import { serializer } from "../utils/helpers"

import Carousel from "../components/carousel"

const Strain = ({ pageContext }) => {
  const strain = pageContext.strain
  console.log(strain)
  return (
    <Layout>
      <Seo title={strain.title} />
      <Flex w={["100%", "100%", "95%", "95%"]} m="0 auto" flexWrap="wrap">
        <Box w={["100%", "100%", "65%", "65%"]}>
          <Carousel images={strain.carouselImages} />
        </Box>
        <Flex
          w={["100%", "100%", "35%", "35%"]}
          alignItems="center"
          bg={strain.color}
        >
          <Box p="3rem">
            <Heading as="h1" color="white">
              {strain.title}
            </Heading>
            <Heading
              as="h3"
              color="white"
              fontWeight="regular"
              fontSize={["14px", "16px", "18px", "20px", "22px", "24px"]}
            >
              {strain.effects}
            </Heading>
            <Box>
              <Heading as="h4" color="white" variant="caption">
                <b>Strain:</b> {strain.strainName}
              </Heading>
              <Heading as="h4" color="white" variant="caption">
                <b>Time of use:</b> {strain.timeOfUse}
              </Heading>
              <Heading as="h4" color="white" variant="caption">
                <b>Suggested Pairings:</b> {strain.suggestedPairings}
              </Heading>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Box textAlign="center" p="5rem 2rem" maxWidth="1240px" m="0 auto">
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={["32px", "32px", "36px", "36px", "42px", "42px"]}
        >
          {strain.title}
        </Heading>
        <Heading
          as="h3"
          fontFamily="Fira Sans"
          color="#000"
          fontSize={["26px", "26px", "28px", "28px", "30px", "30px"]}
        >
          {strain.effects}
        </Heading>
        <PortableText blocks={strain._rawBody} serializers={serializer} />
      </Box>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {strain.bottomImages.map((img, i) => (
          <Box key={i} w={["100%", "100%", "100%", "33%", "33%", "33%"]}>
            <Box p="0.3rem">
              <GatsbyImage
                image={img.asset.gatsbyImageData}
                aspectRatio={16 / 10}
                layout="fullWidth"
                formats={["auto", "webp", "avif"]}
                alt={strain.title + " Bottom Image " + i}
              />
            </Box>
          </Box>
        ))}
      </Flex>
    </Layout>
  )
}

export default Strain
