import React from "react"
import { Box, Heading, Text } from "@chakra-ui/react"

import { StaticImage } from "gatsby-plugin-image"

const Marker = ({ distributor, marker, setMarker, uniqueMarker }) => {
  return (
    <Box position="relative">
      <Box
        w="32px"
        h="32px"
        borderRadius="50%"
        overflow="hidden"
        transition="all 175ms ease-in-out"
        _hover={{
          transform: "scale(1.15)",
        }}
        onClick={() =>
          setMarker(marker === uniqueMarker ? false : uniqueMarker)
        }
      >
        <StaticImage src="../images/marker.png" />
      </Box>
      <Box
        position="absolute"
        bg="white"
        boxShadow="5px 5px 10px rgba(0,0,0,0.5)"
        p="1rem"
        display={marker === uniqueMarker ? "block" : "none"}
        top="150%"
        left="-2.5rem"
        minWidth="200px"
        width="10vw"
        maxWidth="500px"
        zIndex="900"
      >
        <Box textAlign="right" onClick={() => setMarker(false)}>
          x
        </Box>
        <Heading
          as="h6"
          variant="h6"
          fontSize={["12px", "14px", "16px", "18px"]}
        >
          {distributor.node.title}
        </Heading>
        <Text fontSize={["12px", "14px", "15px", "16px"]}>
          {distributor.node.address}
        </Text>
      </Box>
    </Box>
  )
}

export default Marker
