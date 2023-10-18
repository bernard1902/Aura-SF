import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

import { Box, Flex } from "@chakra-ui/react"

import Links, { LinksMobile } from "./links"
import LoadContext from "../context/LoadContext"

const Header = ({ siteTitle, varietals, settings }) => {
  const [toggled, setToggled] = useState(false)
  const load = useContext(LoadContext)
  return (
    <Box
      p="0.6rem 0"
      position="sticky"
      top="0"
      zIndex="99"
      bg="white"
      overflow="hidden"
    >
      <Flex
        justifyContent="space-between"
        w="95%"
        m=" 0 auto"
        as="header"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box
          w={["100%", "100%", "100%", "30%", "30%", "30%"]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Link to="/">
              <Box w="124px" display="inline-block">
                <StaticImage
                  src="../images/aura_logo_type.png"
                  alt="Aura SF Logo"
                  placeholder="blurred"
                />
              </Box>
            </Link>
          </Box>
          <Box
            float="right"
            cursor="pointer"
            display={["block", "block", "block", "none", "none", "none"]}
          >
            <Box
              w="18px"
              display="inline-block"
              mr="1.5rem"
              onClick={() => load.setCartStatus(true)}
            >
              <StaticImage src="../images/cart.svg" alt="cart" />
            </Box>
            <Box
              w="24px"
              position="relative"
              onClick={() => setToggled(!toggled)}
              display="inline-block"
            >
              <Box
                borderBottom="2px solid black"
                w="100%"
                mb="6px"
                opacity={toggled ? 0 : 1}
                transform={toggled ? "translateY(-5px)" : "translateY(0)"}
                transition="all 375ms ease-in-out"
              />
              <Box
                borderBottom="2px solid black"
                w={toggled ? "100%" : "80%"}
                transition="all 375ms ease-in-out"
                transform={toggled ? "rotate(45deg)" : "rotate(0deg)"}
                mb="6px"
              />
              <Box
                borderBottom="2px solid black"
                w={toggled ? "100%" : "80%"}
                top="8px"
                mb="6px"
                position="absolute"
                transition="all 375ms ease-in-out"
                transform={toggled ? "rotate(-45deg)" : "rotate(0deg)"}
              />
              <Box
                borderBottom="2px solid black"
                w="100%"
                opacity={toggled ? 0 : 1}
                transform={toggled ? "translateY(5px)" : "translateY(0)"}
                transition="all 375ms ease-in-out"
              />
            </Box>
          </Box>
        </Box>
        <Box display={["none", "none", "none", "block", "block", "block"]}>
          <Links varietals={varietals} settings={settings} />
        </Box>
        <Box
          display={["block", "block", "block", "none", "none", "none"]}
          bg="white"
          w="100%"
          transformOrigin="top center"
          maxHeight={toggled ? "100rem" : "0"}
          transition="max-height 0.7s ease-in-out"
        >
          <LinksMobile varietals={varietals} />
        </Box>
      </Flex>
    </Box>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
