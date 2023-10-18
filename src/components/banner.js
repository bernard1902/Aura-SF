import React from "react"
import { Box } from "@chakra-ui/react"
import { StaticImage } from "gatsby-plugin-image"

const Banner = ({ children }) => {
  return (
    <Box w="95%" m="0 auto" position="relative">
      {children}
    </Box>
  )
}

export const Footer = ({ children }) => {
  return (
    <Box maxWidth="2140px" m=" 0 auto">
      {children}
    </Box>
  )
}

export default Banner
