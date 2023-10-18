/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import {
  Box,
  Heading,
  Text,
  Flex,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react"

import Header from "./header"

import Alert from "./alert"

import SignupMailchimp from "./signupMailchimp"

import { rawLinks } from "./links"

import Cart from "./cart"
import { useForm } from "react-hook-form"
import axios from "axios"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      allSanitySiteSettings {
        edges {
          node {
            instagram
            facebook
            pinterest
            tumblr
            varietals
          }
        }
      }
      allSanityDiscount {
        edges {
          node {
            title
            type
            expiry
            code
            amount
          }
        }
      }
      sanitySiteSettings(_id: { eq: "3ea7822f-b60d-4deb-ab3d-cc6e6d62b685" }) {
        instagram
        facebook
        pinterest
        tumblr
        varietals
        exciseTax
      }
      allCountyTax {
        edges {
          node {
            city
            county
            rate
          }
        }
      }
      allSanityStrain {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `)

  const ref = useRef(null)

  const varietals = data.allSanityStrain.edges

  const settings = data.sanitySiteSettings

  const discounts = data.allSanityDiscount

  const cityTax = data.allCountyTax.edges

  const [height, setHeight] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm()

  const usedLinks = settings.varietals
    ? rawLinks
    : rawLinks.filter(link => link.name !== "Varietals")

  useEffect(() => {
    setHeight(ref.current.clientHeight)
  })

  const onSubmit = async values => {
    setError(false)
    await axios
      .post(
        "https://us-central1-aura-website-3616a.cloudfunctions.net/klaviyoHandle",
        {},
        {
          params: {
            emailAddress: values.emailAddress,
          },
        }
      )
      .then(response => {
        setSuccess(true)
        console.log(response)
      })
      .catch(err => {
        setSuccess(true)
        console.log(err)
      })
      .then(response => {
        setSuccess(true)
        console.log(response)
      })

    setSuccess(true)
    return
  }

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        varietals={varietals}
        settings={settings}
      />
      <Alert />
      <SignupMailchimp />
      <Cart discounts={discounts} settings={settings} cityTax={cityTax} />
      <Box>
        <Box
          as="main"
          background="#fff"
          marginBottom="5rem"
          zIndex="1"
          position="relative"
        >
          {children}
        </Box>
        <Box position="relative" h={height + "px"}>
          <Box
            as="footer"
            position="fixed"
            bottom="0"
            w="100%"
            ref={ref}
            zIndex="0"
            textAlign="center"
          >
            <Box w="64px" m="0 auto">
              <StaticImage
                src={"../images/Blue_L.png"}
                formats={["auto", "webp", "avif"]}
                alt="Aura SF - Stand Logo"
              />
            </Box>
            <Heading
              padding="1rem 0"
              color="#000"
              fontSize={["16px", "18px", "21px", "24px"]}
            >
              Elevate your experience
            </Heading>
            <Box m="1rem 0">
              <Text fontFamily="Tenor Sans" color="primary">
                Be invited to members only special promotions & exclusive events
              </Text>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box w="95%" m="0 auto">
                  <Input
                    id="emailAddress"
                    placeholder="Email Address"
                    maxWidth="460px"
                    {...register("emailAddress", {
                      required: "This is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length should be 4",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.emailAddress && errors.emailAddress.message}
                  </FormErrorMessage>
                  {error ? (
                    <Text color="red" textAlign="left" mt="1rem">
                      This email is already subscribed to our mailing list.
                      Please use another email address.
                    </Text>
                  ) : (
                    ""
                  )}
                </Box>
                {success ? (
                  <Text mt="1rem">Thank you for signing up!</Text>
                ) : (
                  <Button
                    variant="more"
                    isLoading={isSubmitting}
                    type="submit"
                    mb="2rem"
                    mt="1rem"
                  >
                    Sign up
                  </Button>
                )}
              </form>
            </Box>
            <Box>
              <Box display="inline-block">
                <Link to="/">
                  <Text display="inline-block">Home</Text>
                </Link>
                <Text m="0 0.5rem" display="inline-block">
                  |
                </Text>
              </Box>
              {usedLinks.map((link, i) => (
                <Box key={i} display="inline-block">
                  <Link to={link.slug}>
                    <Text display="inline-block">{link.name}</Text>
                  </Link>
                  {i !== usedLinks.length - 1 ? (
                    <Text display="inline-block" m="0 0.5rem">
                      |
                    </Text>
                  ) : (
                    ""
                  )}
                </Box>
              ))}
            </Box>
            <Flex justifyContent="center" alignItems="center" mb="2rem">
              {settings.facebook ? (
                <Flex
                  w="12px"
                  m="0 0.5rem"
                  _hover={{ opacity: "1" }}
                  opacity="0.6"
                  transition="all 175ms ease-in-out"
                  alignItems="center"
                >
                  <a href={settings.facebook} target="_blank" rel="noreferrer">
                    <StaticImage
                      src="../images/facebook-f-brands.svg"
                      alt="Facebook Icon"
                    />
                  </a>
                </Flex>
              ) : (
                ""
              )}
              {settings.instagram ? (
                <Flex
                  w="18px"
                  m="0 0.5rem"
                  _hover={{ opacity: "1" }}
                  opacity="0.6"
                  transition="all 175ms ease-in-out"
                  alignItems="center"
                >
                  <a href={settings.instagram} target="_blank" rel="noreferrer">
                    <StaticImage
                      src="../images/instagram-brands.svg"
                      alt="Instagram Icon"
                    />
                  </a>
                </Flex>
              ) : (
                ""
              )}
              {settings.pinterest ? (
                <Flex
                  w="19px"
                  m="0 0.5rem"
                  _hover={{ opacity: "1" }}
                  opacity="0.6"
                  transition="all 175ms ease-in-out"
                  alignItems="center"
                >
                  <a href={settings.pinterest} target="_blank" rel="noreferrer">
                    <StaticImage
                      src="../images/pinterest-brands.svg"
                      alt="Pinterest Icon"
                    />
                  </a>
                </Flex>
              ) : (
                ""
              )}
              {settings.tumblr ? (
                <Flex
                  w="11px"
                  m="0 0.5rem"
                  _hover={{ opacity: "1" }}
                  opacity="0.6"
                  transition="all 175ms ease-in-out"
                  alignItems="center"
                >
                  <a href={settings.tumblr} target="_blank" rel="noreferrer">
                    <StaticImage
                      src="../images/tumblr-brands.svg"
                      alt="Tumblr Icon"
                    />
                  </a>
                </Flex>
              ) : (
                ""
              )}
            </Flex>
            <Box bg="#e5e5e5e5" mb="0" padding="1rem 0">
              <Text margin="0" fontSize="12px">
                We respect your privacy © 2020 AURA. All Rights Reserved.
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
