import React, { useState, useContext } from "react"
import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react"

import { Link } from "gatsby"

import Banner, { Footer } from "../components/banner"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { StaticImage, GatsbyImage } from "gatsby-plugin-image"

import PortableText from "@sanity/block-content-to-react"

import { serializer } from "../utils/helpers"
import LoadContext from "../context/LoadContext"

import Profile from "../components/profile"

import Carousel from "../components/carousel"
import find from "lodash.find"

const Product = ({ pageContext }) => {
  const product = pageContext.product
  const terpeneProfile =
    product.profile.length > 0 ? product.profile : product.strain.profile
  const [profile, setProfile] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const load = useContext(LoadContext)

  const hoverStyle = {
    _disabled: {
      bgColor: "primary",
    },
  }

  const handleAddCart = () => {
    load.setItems(load.items + quantity)
    let cartCurrent = load.cart
    const findIndex = cartCurrent.findIndex(obj => obj.product === product)
    if (findIndex > -1) {
      cartCurrent[findIndex].quantity =
        cartCurrent[findIndex].quantity + quantity
    } else {
      cartCurrent = [...cartCurrent, { product: product, quantity: quantity }]
    }
    load.setCart(cartCurrent)
    setQuantity(1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }
  return (
    <Layout>
      <Seo title={product.title} />
      {terpeneProfile ? (
        <Profile
          profile={profile}
          setProfile={setProfile}
          terpeneProfile={terpeneProfile}
          product={product}
        />
      ) : (
        ""
      )}
      <Box w="95%" maxWidth="1240px" m="0 auto" pt="1.5rem" pb="3rem">
        <Link to="/store">
          <Box display="inline-block">
            <Flex
              alignItems="center"
              _hover={{
                "&>div": { transform: "scale(1)", opacity: "1" },
                "&>p": { opacity: "1" },
              }}
            >
              <Flex
                w="32px"
                alignItems="center"
                mr="10px"
                transform="scale(0.9)"
                transformOrigin="center right"
                opacity="0.6"
                transition="all 275ms ease-in-out"
              >
                <StaticImage src="../images/arrow.png" alt="Back arrow" />
              </Flex>
              <Text mb="0" opacity="0" transition="all 275ms ease-in-out">
                back
              </Text>
            </Flex>
          </Box>
        </Link>
      </Box>
      <Flex
        textAlign="center"
        w="90%"
        maxWidth="1048px"
        m="0 auto"
        flexWrap="wrap"
        justifyContent="space-between"
        pb="3rem"
      >
        <Box w={["100%", "100%", "48%", "48%", "48%", "48%"]}>
          <Carousel images={product.mainImage} />
        </Box>
        <Flex
          w={["100%", "100%", "46%", "46%", "46%", "46%"]}
          textAlign="left"
          mt="2rem"
        >
          <Box>
            <Heading
              as="h4"
              variant="h4"
              color="black"
              fontSize={["14px", "16px", "18px", "18px", "21px", "21px"]}
              pb="0.5rem"
            >
              Flower
            </Heading>
            <Heading as="h1" variant="h1">
              {product.title}
            </Heading>
            <Heading
              as="h2"
              variant="h2"
              color="black"
              fontFamily="Fira Sans"
              fontWeight="300"
              fontSize={["21px", "24px", "27px", "29px", "31px", "34px"]}
              mb="3rem"
            >
              {"$"}
              {product.price.toFixed(2)}
            </Heading>

            <Box>
              <Heading
                variant="h6"
                fontSize={["11px", "12px", "14px", "16px", "16px", "18px"]}
                color="black"
                pb="0.5rem"
                as="p"
              >
                QUANTITY
              </Heading>
              <Box mb="2rem">
                <Box display="inline-block">
                  <Flex
                    alignItems="center"
                    border="1px solid black"
                    borderRadius="5px"
                  >
                    <Box
                      p="0.2rem 0.7rem"
                      borderRight="1px solid black"
                      cursor="pointer"
                      onClick={() =>
                        quantity === 1 ? "" : setQuantity(quantity - 1)
                      }
                    >
                      <Box
                        opacity={quantity === 1 ? "0.4" : "1"}
                        pointerEvents="none"
                      >
                        -
                      </Box>
                    </Box>
                    <Box bg="rgba(0,43,122,0.2)" p="0.2rem 1.2rem">
                      {quantity}
                    </Box>
                    <Box
                      p="0.2rem 0.7rem"
                      borderLeft="1px solid black"
                      cursor="pointer"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Button
                variant="more"
                mb="3rem"
                disabled={added}
                _hover={hoverStyle}
                onClick={() => {
                  handleAddCart()
                }}
              >
                {added ? (
                  "ADDED TO CART!"
                ) : (
                  <>
                    ADD TO CART ({"$"}
                    {(product.price * quantity).toFixed(2)})
                  </>
                )}
              </Button>
            </Box>
            <Flex alignItems="center" mb="1.5rem">
              <Flex
                w="18px"
                alignItems="center"
                mr="0.5rem"
                opacity="0.6"
                color="primary"
              >
                <StaticImage src="../images/vial.svg" alt="THC icon" />
              </Flex>
              <Text mb="0" fontWeight="500">
                THC - {product.thc}%, CBD - {product.cbd}%
              </Text>
            </Flex>
            <Flex alignItems="center" mb="0.5rem">
              <Flex w="18px" alignItems="center" mr="0.5rem">
                <StaticImage src="../images/weight.png" alt="Weight icon" />
              </Flex>
              <Text mb="0">{product.weight}</Text>
            </Flex>
            <Flex alignItems="center" mb="2rem">
              <Flex w="18px" alignItems="center" mr="0.5rem">
                <StaticImage src="../images/smiley.png" alt="Weight icon" />
              </Flex>
              <Text mb="0">{product.strain.effects}</Text>
            </Flex>
            {terpeneProfile ? (
              <Button variant="less" mb="2rem" onClick={() => setProfile(true)}>
                Profile
              </Button>
            ) : (
              ""
            )}
            <Box mb="3rem">
              <Heading
                variant="h6"
                fontSize={["14px", "16px", "18px", "18px", "21px", "21px"]}
                color="black"
                pb="0.5rem"
              >
                About This Strain
              </Heading>
              <PortableText
                blocks={product._rawBody}
                serializers={serializer}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Product
