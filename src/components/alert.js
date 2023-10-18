import React, { useContext } from "react"
import { Box, Text, Button } from "@chakra-ui/react"

import LoadContext from "../context/LoadContext"

const Alert = () => {
  const load = useContext(LoadContext)
  return (
    <Box
      position="fixed"
      zIndex="999"
      bg={load.loaded ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.8)"}
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      pointerEvents={load.loaded ? "none" : "all"}
      transition="all 175ms ease-in-out"
    >
      <Box
        bg="#fff"
        w="95%"
        maxWidth="640px"
        p="1.5rem"
        textAlign="center"
        margin="0 auto"
        transition="all 175ms ease-in-out"
        opacity={load.loaded ? "0" : "1"}
      >
        <Text fontFamily="Tenor Sans" color="primary">
          Are you over 21 years old?
        </Text>
        <Text fontSize={["11px", "12px", "14px", "16px"]} padding="1rem 0">
          This website requires you to be 21 years or older to enter
        </Text>
        <Button variant="more" mb="1rem" onClick={() => load.setLoaded(true)}>
          Yes, I am
        </Button>
        <Box m="0 0.5rem" display="inline-block"></Box>
        <a href="https://www.google.com/">
          <Button variant="less" mb="1rem">
            No, I am not
          </Button>
        </a>
      </Box>
    </Box>
  )
}

export default Alert
