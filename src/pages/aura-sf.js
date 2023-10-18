import React from "react"
import { Box, Heading, Text } from "@chakra-ui/react"

import { StaticImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Story = () => {
  return (
    <Layout>
      <Seo title="Story" />
      <Banner>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-story-cover-1.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
      </Banner>
      <Box
        textAlign="center"
        w="95%"
        maxWidth="1240px"
        m={["3.5rem auto", "4rem auto", "4.5rem auto", "5rem auto"]}
      >
        <Heading as="h2" mb="1rem">
          Cannabis & San Francisco
        </Heading>
        <Heading
          as="h3"
          mb="2rem"
          color="#000"
          fontSize={["18px", "21px", "24px", "27px"]}
        >
          Why choose Aura
        </Heading>
        <Box>
          <Text>
            Aura is an indoor cannabis cultivation company based in San
            Francisco with one goal: to deliver the ultimate experience to our
            customers. Our buds are inspired by the women who inspire us. These
            are the women that are the leaders, innovators, wonderers,
            achievers, aspirers, creators, seekers, overcomers, inquirers,
            educators, heroes, inspirers, trailblazers, believers, risk-takers,
            pathfinders, endeavors, smart, curious, and passionate. Our
            customers deserve and expect the absolute best, and we strive to
            exceed their expectations.
          </Text>
          <Text>
            Why San Francisco? Sure, the rent is high, but you can’t beat the
            quality of cannabis grown in the Bay Area. The region surrounding
            San Francisco is known for growing the finest cannabis in the world
            and the area is rich in knowledge about the best growing practices.
            Having our own cultivation facility in San Francisco gives us a
            wealth of knowledge and access to new strains and genetics allowing
            us the luxury of selecting and handcrafting our flowers and products
            specifically designed for our consumers.
          </Text>
        </Box>
        <Box m="3rem auto">
          <StaticImage
            layout="fullWidth"
            aspectRatio={16 / 7}
            src={"../images/aura-story-photo-1b.jpeg"}
            formats={["auto", "webp", "avif"]}
            alt="San Francisco"
          />
        </Box>
        <Box>
          <Text>
            Our team has over 75 years of combined growing experience. We are
            passionate about cannabis and we believe in putting in the utmost
            care and attention to detail when tending to our plants. The result
            is superior cannabis with balanced THC, cannabinoids, and terpene
            profiles.
          </Text>
          <Text>
            Aura makes you feel good, but it’s also cannabis you can feel good
            about. We grow all of our plants using sustainable practices without
            any harsh chemicals of any kind. We also keep sustainability in
            mind, reusing and recycling as much as possible from seed to sale.
          </Text>
        </Box>
      </Box>
      <Box maxWidth="1240px" m="0 auto" w="95%" pb="4rem">
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-story-photo-2b.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
      </Box>
      <Footer>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-story-cover-c.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Footer Image"
        />
      </Footer>
    </Layout>
  )
}

export default Story
