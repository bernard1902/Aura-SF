import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"

const Instagram = ({ images }) => {
  console.log(images)
  return (
    <Flex
      flexWrap="wrap"
      justifyContent="space-between"
      maxWidth="720px"
      m="2rem auto 0"
    >
      {images.map((image, i) => (
        <Box key={i} w="32%" mb="1rem">
          <a href={image.node.permalink} target="_blank" rel="noreferrer">
            <GatsbyImage
              image={image.node.localImage.childImageSharp.gatsbyImageData}
            />
          </a>
        </Box>
      ))}
    </Flex>
  )
}

export default Instagram
