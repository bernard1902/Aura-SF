import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Box, Heading, Text, Flex } from "@chakra-ui/react"

import { StaticImage } from "gatsby-plugin-image"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { GatsbyImage } from "gatsby-plugin-image"

import Select from "react-select"

const CardComponent = ({ product, pt }) => {
  const [hover, setHover] = useState(false)
  return (
    <Box
      mt={pt}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      position="relative"
      overflow="hidden"
    >
      <Link to={"/store/" + product.node.slug.current}>
        <Box
          transform={hover ? "scale(1.4)" : "scale(1)"}
          transition="all 375ms ease-in-out"
        >
          <Box opacity={hover ? 0 : 1} transition="all 375ms ease-in-out">
            <GatsbyImage
              image={product.node.mainImage[0].asset.gatsbyImageData}
            />
          </Box>
          <Box
            opacity={hover ? 1 : 0}
            transition="all 375ms ease-in-out"
            position="absolute"
            width="100%"
            height="100%"
            top="0"
            left="0"
          >
            <GatsbyImage
              image={
                product.node.mainImage[
                  product.node.mainImage.length > 1 ? 1 : 0
                ].asset.gatsbyImageData
              }
            />
          </Box>
        </Box>
        <Flex mt="1rem">
          <Box
            w="50%"
            transform={hover ? "translate(15px,-20px)" : "translate(0,0)"}
            transition="all 375ms ease-in-out"
          >
            <Heading
              as="h4"
              variant="h4"
              fontSize={["12px", "14px", "16px", "18px", "21px", "24px"]}
              color={hover ? "white" : "black"}
              transition="all 375ms ease-in-out"
              pb="0"
            >
              {product.node.slug.current ===
              "aura-bogo---buy-a-jar-get-a-pre-roll-set"
                ? "Random"
                : product.node.strain.title}
            </Heading>
            <Text
              mb="0"
              color={hover ? "white" : "black"}
              transition="all 375ms ease-in-out"
            >
              {product.node.slug.current ===
              "aura-bogo---buy-a-jar-get-a-pre-roll-set"
                ? "Flower + Pre-roll"
                : product.node.productType.title}
            </Text>
          </Box>
          <Box
            w="50%"
            textAlign="right"
            transform={hover ? "translate(-20px,0px)" : "translate(0,0)"}
            transition="all 375ms ease-in-out"
          >
            <Text
              position="relative"
              display="inline"
              padding="10px"
              fontSize="14px"
              color="black"
              fontWeight="regular"
            >
              VIEW MORE
              <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                bg="white"
                zIndex="-1"
                transition="all 375ms ease-in-out"
                transformOrigin="right center"
                borderRadius="5px"
                transform={hover ? "scaleX(1)" : "scaleX(0)"}
              />
            </Text>
          </Box>
        </Flex>
      </Link>
    </Box>
  )
}

const Store = ({ data }) => {
  const productTypes = [
    { value: "All", label: "All" },
    ...data.allSanityProductTypes.edges.map((productType, i) => ({
      value: productType.node.title,
      label: productType.node.title,
    })),
  ]
  const rawProducts = data.allSanityProduct.edges.filter(
    (item, i) =>
      (item.node.endAt === null && item.node.launchAt === null) ||
      (Date.parse(item.node.endAt) > Date.now() &&
        Date.now() > Date.parse(item.node.launchAt)) ||
      (Date.now() > Date.parse(item.node.launchAt) && item.node.endAt === null)
  )
  const newestProducts = data.newest.edges.filter(
    (item, i) =>
      (item.node.endAt === null && item.node.launchAt === null) ||
      (Date.parse(item.node.endAt) > Date.now() &&
        Date.now() > Date.parse(item.node.launchAt)) ||
      (Date.now() > Date.parse(item.node.launchAt) && item.node.endAt === null)
  )
  const [sortedProducts, setSortedProducts] = useState(rawProducts)
  const [products, setProducts] = useState(rawProducts)
  const options = [
    { value: 0, label: "Alphabetical" },
    { value: 1, label: "Newest First" },
  ]

  const setSort = products => {
    setSortedProducts(products)
    setProducts(products)
  }

  const setFilter = value => {
    const source = sortedProducts
    const result = source.filter(
      product => product.node.productType.title === value
    )
    setProducts(result)
  }

  return (
    <Layout>
      <Seo title="Store" />
      <Banner>
        <StaticImage
          layout="fullWidth"
          aspectRatio={16 / 7}
          src={"../images/aura-home-main-cover.jpeg"}
          formats={["auto", "webp", "avif"]}
          alt="Banner Image"
        />
        <Heading
          as="h1"
          variant="h1"
          color="white"
          position="absolute"
          top="50%"
          left="50%"
          zIndex="9"
          transform="translate(-50%, -50%)"
          textAlign="center"
          width="90%"
        >
          Discover Aura's products
        </Heading>
      </Banner>
      <Box
        textAlign="center"
        w={["80%", "85%", "90%", "95%", "95%", "95%"]}
        maxWidth="1240px"
        m={["3.5rem auto", "4rem auto", "4.5rem auto", "5rem auto"]}
      >
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box
            w={["100%", "100%", "27%", "27%", "27%", "27%"]}
            textAlign="left"
            pb={["4rem", "4rem", "4rem", 0, 0, 0]}
          >
            <Heading as="h2" mb="1rem" textAlign="left">
              Products
            </Heading>
            <Box>
              <Select
                options={options}
                defaultValue={options[0]}
                isClearable={false}
                isSearchable={false}
                onChange={e =>
                  e.value === 0
                    ? setSort(rawProducts)
                    : e.value === 1
                    ? setSort(newestProducts)
                    : setSort(rawProducts)
                }
              />
            </Box>
            <Box mt="1rem" mb="2rem">
              <Select
                options={productTypes}
                defaultValue={productTypes[0]}
                isClearable={false}
                isSearchable={false}
                onChange={e =>
                  e.value === "All"
                    ? setProducts(sortedProducts)
                    : setFilter(e.value)
                }
              />
            </Box>
            {products.map((product, i) => (
              <Box key={i} display={i % 3 === 0 ? "block" : "none"}>
                <CardComponent
                  product={product}
                  pt={["2rem", "2rem", "2rem", "6rem", "6rem", "6rem"]}
                />
              </Box>
            ))}
          </Box>
          <Box
            w={["100%", "100%", "35%", "35%", "35%", "35%"]}
            textAlign="left"
          >
            {products.map((product, i) => (
              <Box
                key={i}
                display={(i % 3) - 1 === 0 ? "block" : "none"}
                pb={["2rem", "2rem", "3rem", "3rem", "3rem", "3rem"]}
              >
                <CardComponent product={product} />
              </Box>
            ))}
          </Box>
          <Box
            w={["100%", "100%", "27%", "27%", "27%", "27%"]}
            textAlign="left"
          >
            {products.map((product, i) => (
              <Box
                key={i}
                display={(i % 3) - 2 === 0 ? "block" : "none"}
                pb={["2rem", "2rem", "2rem", "2rem", "2rem", "2rem"]}
              >
                <CardComponent product={product} />
              </Box>
            ))}
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

export default Store

export const query = graphql`
  query StoreQuery {
    allSanityProductTypes {
      edges {
        node {
          title
        }
      }
    }
    allSanityProduct(
      filter: { published: { eq: true } }
      sort: { fields: strain___title }
    ) {
      edges {
        node {
          launchAt
          endAt
          strain {
            title
          }
          mainImage {
            asset {
              gatsbyImageData(aspectRatio: 1)
            }
          }
          backImage: mainImage {
            asset {
              gatsbyImageData
            }
          }
          slug {
            current
          }
          title
          productType {
            title
          }
        }
      }
    }
    newest: allSanityProduct(
      filter: { published: { eq: true } }
      sort: { fields: _createdAt, order: DESC }
    ) {
      edges {
        node {
          launchAt
          endAt
          strain {
            title
          }
          mainImage {
            asset {
              gatsbyImageData(aspectRatio: 1)
            }
          }
          backImage: mainImage {
            asset {
              gatsbyImageData
            }
          }
          slug {
            current
          }
          title
          productType {
            title
          }
        }
      }
    }
  }
`
