import React from "react"

import { StaticImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Flex, Text, Heading, Button, Divider } from "@chakra-ui/react"

import ContactForm from "../components/contactform.js"

const ThankYou = () => {
  return (
    <Layout>
      <Seo title="Thank you" />
      <Box w="95%" maxWidth="1240px" m=" 0 auto" p="5rem 0">
        <Box textAlign="center">
          <Heading>Thank You</Heading>
          <Text mb="5rem">
            Thank you for ordering via the website, we look forward to seeing
            you during pickup.
          </Text>
          <Divider w="30%" minWidth="120px" m="0 auto" />
        </Box>
      </Box>
      <Footer>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-contact-footer.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Footer Image"
        />
      </Footer>
    </Layout>
  )
}

export default ThankYou
