import React from "react"
import { Box, Heading, Text, Flex } from "@chakra-ui/react"

import { StaticImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Cannabis = () => {
  return (
    <Layout>
      <Seo title="Story" />
      <Banner>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-cannabis-00.jpeg"}
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
          Incubation
        </Heading>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Text w={["100%", "100%", "49%", "49%"]} textAlign="left">
            The incubation process maximizes quality and ensures that our plants
            are vigorous, disease-free, pest-free, and high yielding. We use
            cloning to preserve and repeat the characteristics of strong,
            healthy plants. Plus, cloning guarantees a flowering female plant
            every time!
          </Text>
          <Text w={["100%", "100%", "49%", "49%"]} textAlign="left">
            Aura growers take optimal plant tissue cuttings from the Mother
            plants, these are then prepared using our proprietary cloning
            process. Once the preparation is completed, they are dipped into a
            clone-specific nutrient solution and placed into a tray with a
            growing medium. These trays, with the baby plants, are placed in a
            comfortable environment that is warm and humid to help accelerate
            the regeneration process. Simply put we cuddle the heck out of our
            babies. When the plants reach a height of about six inches, we
            transfer them to another medium to aid in strengthening them to
            ensure they are on the path to growing up into healthy teens and
            then eventually into healthy female flowering plants.
          </Text>
        </Flex>
      </Box>
      <Box>
        <Flex flexWrap="wrap" alignItems="center">
          <Box w={["100%", "100%", "50%", "50%"]}>
            <StaticImage
              layout="fullWidth"
              aspectRatio={1}
              src={"../images/aura-cannabis-growing-01.png"}
              formats={["auto", "webp", "avif"]}
              alt="Leaf under light"
            />
          </Box>
          <Box w={["100%", "100%", "50%", "50%"]}>
            <Box p="3rem">
              <Heading as="h2">Growing</Heading>
              <Text>
                The gardening staff customizes each strain’s growing environment
                for each phase of the flowering cycle to ensure that the plants
                grow tall, strong, and healthy. Healthy plants provide the buds
                with an opportunity to maximize their potential to produce
                better quality and higher yields.
              </Text>
              <Text p="2rem" bg="rgb(249,249,249)">
                To do this, we use an LED lighting system that provides a
                tailored spectrum of light for cannabis flowering. Paired with
                additional CO2 and controlled humidity, this allows for freer
                CO2 transpiration for the plants. The plants are grown using a
                proprietary organic medium and nutrients. As part of our pest
                management program, the gardeners at Aura, employ beneficial
                bugs to reduce pests that adversely impact the growth of the
                plants and to mitigate the need for organic pesticides.
              </Text>
              <Box>
                <Box
                  w={["47%", "47%", "30%", "30%"]}
                  marginRight="3%"
                  display="inline-block"
                >
                  <StaticImage
                    layout="fullWidth"
                    aspectRatio={16 / 9}
                    src={"../images/aura-cannabis-12.jpeg"}
                    formats={["auto", "webp", "avif"]}
                    alt="Growing plants"
                  />
                </Box>
                <Box
                  w={["47%", "47%", "30%", "30%"]}
                  marginRight={["0", "0", "3%", "3%"]}
                  marginLeft={["3%", "3%", "0", "0"]}
                  display="inline-block"
                >
                  <StaticImage
                    layout="fullWidth"
                    aspectRatio={16 / 9}
                    src={"../images/aura-cannabis-13.jpeg"}
                    formats={["auto", "webp", "avif"]}
                    alt="Plants growing in soil"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex flexWrap="wrap" alignItems="center" flexDirection="row-reverse">
          <Box w={["100%", "100%", "50%", "50%"]}>
            <StaticImage
              layout="fullWidth"
              aspectRatio={1}
              src={"../images/aura-cannabis-21.jpeg"}
              formats={["auto", "webp", "avif"]}
              alt="Leaf under light"
            />
          </Box>
          <Box w={["100%", "100%", "50%", "50%"]}>
            <Box p="3rem">
              <Heading as="h2">Harvesting</Heading>
              <Text>
                Growers remove the large fan leaves before beginning the
                harvesting process. They leave the small leaves in place to
                protect the trichomes and allow the buds to dry more slowly. We
                handle our plant extremely carefully; rough handling can cause
                the trichomes to fall off and that is to be always avoided at
                all cost.
              </Text>
              <Text p="2rem" bg="rgb(249,249,249)">
                Each plant is hung to dry for up to 14 days in a controlled
                environment for removing the exact amount of moisture content.
                Our practice is to dry slowly with air circulation to ensure an
                optimal balance of flavors and potency. The plants are ready
                when the branches and stems crack fairly readiliy, rather than
                snapping (too dry) or having a flexible bend (too wet).
              </Text>
              <Box>
                <Box
                  w={["47%", "47%", "30%", "30%"]}
                  marginRight="3%"
                  display="inline-block"
                >
                  <StaticImage
                    layout="fullWidth"
                    aspectRatio={16 / 9}
                    src={"../images/aura-cannabis-22.jpeg"}
                    formats={["auto", "webp", "avif"]}
                    alt="Growing plants"
                  />
                </Box>
                <Box
                  w={["47%", "47%", "30%", "30%"]}
                  marginRight={["0", "0", "3%", "3%"]}
                  marginLeft={["3%", "3%", "0", "0"]}
                  display="inline-block"
                >
                  <StaticImage
                    layout="fullWidth"
                    aspectRatio={16 / 9}
                    src={"../images/aura-cannabis-23.jpeg"}
                    formats={["auto", "webp", "avif"]}
                    alt="Plants growing in soil"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex flexWrap="wrap" alignItems="center" mb="5rem">
          <Box w={["100%", "100%", "50%", "50%"]}>
            <StaticImage
              layout="fullWidth"
              aspectRatio={1}
              src={"../images/aura-cannabis-31.jpeg"}
              formats={["auto", "webp", "avif"]}
              alt="Leaf under light"
            />
          </Box>
          <Box w={["100%", "100%", "50%", "50%"]}>
            <Box p="3rem">
              <Heading as="h2">Trimming & Curing</Heading>
              <Text>
                Trimming means manicuring the cannabis flowers or buds from the
                rest of the plant material. At Aura we have a dedicated team of
                trimmers who meticulously hand trim every flower to deliver the
                best product to our customers.
              </Text>
              <Text p="2rem" bg="rgb(249,249,249)">
                The curing process is the grand finale of our cultivation
                process and is done after all trimming has been completed.
                Curing brings out the flavor complexity of the flower and makes
                the cannabis more pleasant to smoke. During the curing process,
                the flowers continue to dry very slowly. Once the flowers are
                85-90% dry, we seal them in airtight curing jars to cure for at
                least 30 additional days in a cool, dark place.
              </Text>
              <Box>
                <Box
                  w={["47%", "47%", "30%", "30%"]}
                  marginRight="3%"
                  display="inline-block"
                >
                  <StaticImage
                    layout="fullWidth"
                    aspectRatio={16 / 9}
                    src={"../images/aura-cannabis-32.jpeg"}
                    formats={["auto", "webp", "avif"]}
                    alt="Growing plants"
                  />
                </Box>
                <Box
                  w={["47%", "47%", "30%", "30%"]}
                  marginRight={["0", "0", "3%", "3%"]}
                  marginLeft={["3%", "3%", "0", "0"]}
                  display="inline-block"
                >
                  <StaticImage
                    layout="fullWidth"
                    aspectRatio={16 / 9}
                    src={"../images/aura-cannabis-33.jpeg"}
                    formats={["auto", "webp", "avif"]}
                    alt="Plants growing in soil"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Footer>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-cannabis-bottom.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Footer Image"
        />
      </Footer>
    </Layout>
  )
}

export default Cannabis
