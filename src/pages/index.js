import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Instagram from "../components/instagram"
import Carousel from "../components/carousel"

import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react"

const IndexPage = ({ data }) => {
  const settings = data.sanitySiteSettings
  const strains = data.allSanityStrain.edges
  {/*
  const instagramImages = data.allInstagramContent.edges
   */}
  return (
    <Layout>
      <Seo title="Home" />
      <Banner>
        {settings.carouselItems.length > 0 ? (
          <Carousel images={settings.carouselItems} frontPage />
        ) : (
          <StaticImage
            layout="fullWidth"
            aspectRatio={16 / 7}
            src={"../images/aura-home-main-cover.jpeg"}
            formats={["auto", "webp", "avif"]}
            alt="Banner Image"
          />
        )}
      </Banner>
      <Box
        w="95%"
        m={["3.5rem auto", "4rem auto", "4.5rem auto", "5rem auto"]}
        textAlign="center"
      >
        <Heading as="h2">Elevate your experience</Heading>
        <Text w="100%" maxWidth="720px" m="0.5rem auto">
          Aura dials up the saturation on the colors of life, turning ordinary
          moments into extraordinary experiences. Think dreamy sunlit afternoons
          with friends, deeply relaxing evenings snuggled up on the couch,
          stimulating creativity sessions, and healing meditative practices.
          Aura makes you better at what you do best. Aura is your life,
          enhanced.
        </Text>
      </Box>
      {settings.varietals ? (
        <Box textAlign="center" w="95%" maxWidth="1240px" m="0 auto">
          <Heading as="h2" mb="3rem">
            Select your effect
          </Heading>
          <Flex justifyContent="space-between" flexWrap="wrap">
            {strains.map((product, i) => (
              <Box
                w={["100%", "100%", "48%", "48%"]}
                key={i}
                mb={["3.5rem", "4rem", "4.5rem", "5rem"]}
              >
                <GatsbyImage
                  image={product.node.thumbnailImage.asset.gatsbyImageData}
                  layout="fullWidth"
                  formats={["auto", "webp", "avif"]}
                  alt={product.node.title + " Image"}
                />
                <Heading as="h4" variant="h4" mb="0.5rem" mt="1.5rem" pb="0">
                  {product.node.title}
                </Heading>
                <Heading as="h6" variant="h6" mt="0" pt="0">
                  {product.node.effects}
                </Heading>
                <Text mb="2rem" p="0 3rem">
                  {product.node.description}
                </Text>
                <Link to={"/" + product.node.slug.current}>
                  <Button variant="more">LEARN MORE</Button>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>
      ) : (
        ""
      )}
      <Box maxWidth="1240px" m="0 auto" w="95%">
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-home-our-mission.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
      </Box>
      <Box
        w="95%"
        m={["3.5rem auto", "4rem auto", "4.5rem auto", "5rem auto"]}
        textAlign="center"
      >
        <Heading as="h2">Our Mission</Heading>
        <Text w="100%" maxWidth="720px" m="0.5rem auto">
          We believe that cannabis can be used as a means to enhance your
          day-to-day. Our meticulously grown strains are inspired by the women
          who inspire us. Each strain is designed to be effective and enjoyable,
          and to personalize your experience to suit your individual goals. The
          effects are precise and integrated, designed to give you a pleasant
          boost in the direction of your choice. Use Aura as a level-up to make
          you better at what you do best or as a restorative tool to help you
          achieve balance. Whichever you prefer, unleashing Aura adds magic to
          your life.
        </Text>
        {/* 
        {settings.showInstagram ? <Instagram images={instagramImages} /> : ""}
        */}
      </Box>
      <Footer>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/home-mission-bottom.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Footer Image"
        />
      </Footer>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    sanitySiteSettings(_id: { eq: "3ea7822f-b60d-4deb-ab3d-cc6e6d62b685" }) {
      instagram
      facebook
      pinterest
      tumblr
      varietals
      showInstagram
      carouselItems {
        link
        title
        image {
          asset {
            gatsbyImageData(aspectRatio: 2.28)
          }
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
          thumbnailImage {
            asset {
              gatsbyImageData(aspectRatio: 1.4)
            }
          }
        }
      }
    }
  }
`
