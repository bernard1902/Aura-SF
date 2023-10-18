import React, { useContext, useState, useEffect } from "react"
import { Link } from "gatsby"
import { Box, Text, Heading, Flex, Button, Divider } from "@chakra-ui/react"
import LoadContext from "../context/LoadContext"
import { GatsbyImage } from "gatsby-plugin-image"

import Details from "./details"
import Login from "./login"
import SignUp from "./signup"

const Cart = ({ discounts, settings, cityTax }) => {
  const load = useContext(LoadContext)
  const [signUp, setSignUp] = useState(false)
  const [client, setClient] = useState(false)
  const [userDetails, setUserDetails] = useState(false)
  const totalsArrayed = load.cart.map(
    (cartItem, i) => cartItem.product.price * cartItem.quantity
  )
  const subTotal =
    totalsArrayed.length > 0
      ? totalsArrayed.reduce((a, b) => a + b).toFixed(2)
      : 0

  useEffect(() => setClient(true), [])
  return (
    <Box
      w="100vw"
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      zIndex="99"
      pointerEvents={() => (load.cartStatus ? "all" : "none")}
      key={client ? "empty" : "notEmpty"}
    >
      <Box
        position="absolute"
        w="100%"
        h="100%"
        top="0"
        left="0"
        bg="rgba(0,0,0,0.25)"
        onClick={() => load.setCartStatus(false)}
        opacity={() => (load.cartStatus ? "1" : "0")}
        transition="all 375ms ease-in-out"
        zIndex="100"
      />
      <Box
        position="absolute"
        zIndex="101"
        bg="white"
        width={["100%", "100%", "90%", "90%", "90%", "80%"]}
        height="100%"
        right="0"
        top="0"
        transform={load.cartStatus ? "translateX(0)" : "translateX(100%)"}
        transition="all 575ms ease-in-out"
        overflowY={["scroll", "scroll", "scroll", "hidden", "hidden", "hidden"]}
        key={client ? "empty" : "notEmpty"}
      >
        <Box
          width="90%"
          margin=" 0 auto"
          p="2.5rem 0"
          h={["auto", "auto", "auto", "90%", "90%", "90%"]}
        >
          <Box w="100%" textAlign="right" pb="1rem">
            <Text
              fontFamily="Tenor Sans"
              cursor="pointer"
              display="inline-block"
              onClick={() => load.setCartStatus(false)}
            >
              Close X
            </Text>
          </Box>
          {load.cart.length === 0 ? (
            <Flex
              w="100%"
              h="100%"
              alignItems="center"
              justifyContent="center"
              key={client ? "empty" : "notEmpty"}
            >
              <Flex alignItems="center">
                <Box textAlign="center">
                  <Heading variant="h5">
                    There are no items in your cart
                  </Heading>
                  <Link to="/store" onClick={() => load.setCartStatus(false)}>
                    <Button variant="more">Go to store</Button>
                  </Link>
                </Box>
              </Flex>
            </Flex>
          ) : (
            <Flex
              flexWrap="wrap"
              justifyContent="space-between"
              h="100%"
              key={client ? "empty" : "notEmpty"}
            >
              <Box w={["100%", "100%", "48%", "48%", "48%", "48%"]} h="100%">
                <Box
                  h={["auto", "auto", "auto", "90%", "90%", "90%"]}
                  overflowY={[
                    "hidden",
                    "hidden",
                    "hidden",
                    "scroll",
                    "scroll",
                    "scroll",
                  ]}
                  overflowX="hidden"
                >
                  {load.cart.map((item, i) => (
                    <Flex key={i} justifyContent="space-between" mb="2rem">
                      <Box w={"31%"}>
                        <GatsbyImage
                          image={
                            item.product.cartImage[0].asset.gatsbyImageData
                          }
                          alt={item.product.title}
                        />
                      </Box>
                      <Flex w={"64%"} flexWrap="wrap">
                        <Box w="100%">
                          <Heading
                            color="black"
                            fontSize={[
                              "14px",
                              "16px",
                              "18px",
                              "18px",
                              "21px",
                              "24px",
                            ]}
                            mb="0"
                            pb="0"
                          >
                            {item.product.title}
                          </Heading>
                          <Text>{item.product.weight} grams</Text>
                        </Box>
                        <Flex alignSelf="flex-end" w="100%">
                          <Flex alignSelf="flex-end" w="100%">
                            <Box w="30%" alignSelf="flex-end">
                              <Text mb="0">
                                {"$"}
                                {item.product.price.toFixed(2)}
                              </Text>
                            </Box>
                            <Box w="70%" alignSelf="flex-end">
                              <Text mb="0">
                                <Box>
                                  <Box display="inline-block" float="right">
                                    <Text mb="0.2rem">QTY:</Text>
                                    <Flex
                                      alignItems="center"
                                      border="1px solid black"
                                      borderRadius="5px"
                                    >
                                      <Box
                                        borderRight="1px solid black"
                                        cursor="pointer"
                                      >
                                        <Box
                                          p="0.2rem 0.7rem"
                                          onClick={() => {
                                            if (load.cart[i].quantity !== 1) {
                                              load.setItems(load.items - 1)
                                              load.setCart(
                                                load.cart.map((cartItem, k) =>
                                                  k === i
                                                    ? {
                                                        product:
                                                          cartItem.product,
                                                        quantity:
                                                          cartItem.quantity - 1,
                                                      }
                                                    : cartItem
                                                )
                                              )
                                            } else {
                                              load.setItems(load.items - 1)
                                              load.setCart(
                                                load.cart.filter(
                                                  (it, p) => p !== i
                                                )
                                              )
                                            }
                                          }}
                                        >
                                          {load.cart[i].quantity === 1
                                            ? "x"
                                            : "-"}
                                        </Box>
                                      </Box>
                                      <Box
                                        bg="rgba(0,43,122,0.2)"
                                        p="0.2rem 1.2rem"
                                      >
                                        {load.cart[i].quantity}
                                      </Box>
                                      <Box
                                        p="0.2rem 0.7rem"
                                        borderLeft="1px solid black"
                                        cursor="pointer"
                                        onClick={() => {
                                          load.setCart(
                                            load.cart.map((cartItem, k) =>
                                              k === i
                                                ? {
                                                    product: cartItem.product,
                                                    quantity:
                                                      cartItem.quantity + 1,
                                                  }
                                                : cartItem
                                            )
                                          )
                                          load.setItems(load.items + 1)
                                        }}
                                      >
                                        +
                                      </Box>
                                    </Flex>
                                  </Box>
                                </Box>
                              </Text>
                            </Box>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
                <Box
                  borderTop={[
                    "none",
                    "none",
                    "none",
                    "1px solid #91929b",
                    "1px solid #91929b",
                    "1px solid #91929b",
                  ]}
                  paddingTop={["0", "0", "0", "2rem", "2rem", "2rem"]}
                >
                  <Heading float="left" variant="h4" as="h6">
                    Subtotal
                  </Heading>
                  <Heading
                    float="right"
                    variant="h4"
                    as="p"
                    color="black"
                    fontFamily="Fira Sans"
                  >
                    {"$"}
                    {subTotal}
                  </Heading>
                </Box>
              </Box>
              <Box
                w={["100%", "100%", "48%", "48%", "48%", "48%"]}
                h="100%"
                overflowY={[
                  "hidden",
                  "hidden",
                  "hidden",
                  "scroll",
                  "scroll",
                  "scroll",
                ]}
                overflowX="hidden"
                paddingTop={["2rem", "2rem", "2rem", "none", "none", "none"]}
                borderTop={[
                  "1px solid #91929b",
                  "1px solid #91929b",
                  "1px solid #91929b",
                  "none",
                  "none",
                  "none",
                ]}
              >
                {signUp ? (
                  <SignUp
                    setSignUp={setSignUp}
                    setUserDetails={setUserDetails}
                  />
                ) : (
                  <Login
                    setSignUp={setSignUp}
                    setUserDetails={setUserDetails}
                  />
                )}
                <Divider mt="2rem" />
                {!load.user ? (
                  ""
                ) : (
                  <Details
                    setCartStatus={load.setCartStatus}
                    setUserDetails={setUserDetails}
                    userDetails={userDetails}
                    discounts={discounts}
                    subTotal={subTotal}
                    settings={settings}
                    cityTax={cityTax}
                  />
                )}
              </Box>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Cart
