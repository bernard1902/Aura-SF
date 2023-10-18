import React from "react"

import { StaticImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react"

import ContactForm from "../components/contactform.js"

const Contact = () => {
  return (
    <Layout>
      <Seo title="Contact" />
      <Banner>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-contact-cover-photo.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
      </Banner>
      <Box
        w="95%"
        m={["3.5rem auto", "4rem auto", "4.5rem auto", "5rem auto"]}
        maxWidth="720px"
      >
        <Heading as="h2" mb="0.5rem">
          Contact Us
        </Heading>
        <Text>
          <a href="mailto:info@aura-sf.com">info@aura-sf.com</a>
        </Text>
        <ContactForm />
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

export default Contact
