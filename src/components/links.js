import React, { useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import { Flex, Text, Box } from "@chakra-ui/react"

import LoadContext from "../context/LoadContext"

export const rawLinks = [
  {
    name: "Shop",
    slug: "/store",
  },
  {
    name: "Moods",
    slug: "/moods",
  },
  {
    name: "Aura SF",
    slug: "/aura-sf",
  },
  {
    name: "Cannabis",
    slug: "/cannabis",
  },
  {
    name: "Contact",
    slug: "/contact",
  },
  {
    name: "Find a store",
    slug: "/locations",
  },
]

const Links = ({ settings }) => {
  const [url, setUrl] = useState("")
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.pathname)
    }
  })

  const usedLinks = settings.varietals
    ? rawLinks
    : rawLinks.filter(link => link.name !== "Varietals")

  const load = useContext(LoadContext)

  return (
    <Flex
      alignItems="center"
      sx={{
        "a:hover &": { border: "1px solid #000" },
      }}
    >
      {usedLinks.map((link, i) => {
        return (
          <Link to={link.slug} key={i}>
            <Text
              display="inline-block"
              ml="1.1rem"
              mb="0"
              fontSize={["14px", "15px", "16px", "16px", "16px", "21px"]}
              fontFamily="Tenor Sans"
              variant={url === link.slug ? "toggled" : "link"}
            >
              {link.name}
            </Text>
          </Link>
        )
      })}
      <Box
        position="relative"
        onClick={() => {
          load.setCartStatus(true)
        }}
        cursor="pointer"
      >
        <Text
          display="inline-block"
          ml="1.1rem"
          mb="0"
          fontSize={["14px", "15px", "16px", "16px", "16px", "21px"]}
          fontFamily="Tenor Sans"
          variant="link"
          cursor="pointer"
        >
          Cart
        </Text>
        <Text
          position="absolute"
          top="-5px"
          right="-15px"
          fontSize="9px"
          bg="black"
          color="#fff !important"
          padding="0px 2px"
          fontWeight="bold"
          border="1px solid black"
          borderRadius="4px"
        >
          {load.items}
        </Text>
      </Box>
    </Flex>
  )
}

export const LinksMobile = () => {
  return (
    <Box p="1rem 0" w="100%">
      {rawLinks.map((link, i) => (
        <Box
          key={i}
          borderBottom="1px solid rgb(235, 235, 235)"
          w="100%"
          p="0.7rem 0"
        >
          <Link to={link.slug}>
            <Text
              display="block"
              fontSize="20px"
              fontFamily="Tenor Sans"
              p="0"
              m="0"
            >
              {link.name}
            </Text>
          </Link>
        </Box>
      ))}
    </Box>
  )
}

export default Links
